const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []
  const dummy = listHelper.dummy

  expect(dummy(blogs)).toBe(1)
})

describe('total likes', () => {
  const totalLikes = listHelper.totalLikes

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const arr = totalLikes([blogs[1].likes])
    expect(arr).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const arr = blogs.map(p => p.likes)
    expect(totalLikes(arr)).toBe(36)
  })
})

describe('tests Blog', () => {
  const favoriteBlog = listHelper.favoriteBlog
  const favorite = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  test('finds out which blog has most likes', () => {
    expect(favoriteBlog(blogs)).toEqual(favorite)
  })

  const mostBlogs = listHelper.mostBlogs
  const moreblog = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('author who has the largest amount of blogs', () => {
    expect(mostBlogs(blogs)).toEqual(moreblog)
  })

  const mostLikes = listHelper.mostLikes
  const morelike = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('whose blog posts have the largest amount of likes', () => {
    expect(mostLikes(blogs)).toEqual(morelike)
  })

})

/*
  running a single test (or describe block) from the command line:
  npx jest -t 'test_name'
*/
