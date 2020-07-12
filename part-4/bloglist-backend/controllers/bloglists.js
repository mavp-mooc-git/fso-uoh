const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const morgan = require('morgan')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blogs => {
      if (blogs) {
        response.json(blogs)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


morgan.token('rpost', (request) => JSON.stringify(request.body))
blogsRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :rpost'))

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.status(201).json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
