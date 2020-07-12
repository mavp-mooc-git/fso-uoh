const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  /* Error: Timeout - Async callback was not invoked within
  the 5000 ms timeout specified by jest.setTimeout. */
  jest.setTimeout(10000)
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(6)
})

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('React patterns')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  //expect(response.body.length).toBe(helper.initialBlogs.length)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(titles).toContain('First class tests')
})

/* This usually means that there are asynchronous operations
   that weren't stopped in your tests. Consider running Jest with
   `--detectOpenHandles` to troubleshoot this issue.
    afterAll(async () => {
      await mongoose.connection.close()
    })
*/
afterAll(() => {
  mongoose.connection.close()
})

/*
  command for run test:
  npm test -- tests/blog_api.test.js
*/
