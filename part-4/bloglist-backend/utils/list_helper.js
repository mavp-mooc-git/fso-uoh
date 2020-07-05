const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((ac, blogs) => ac + blogs, 0)
}

const favoriteBlog = blogs => {
  const arr = blogs.map(p => p.likes)
  const fblog = blogs.find(p => p.likes === Math.max(...arr))
  return {
    title: fblog.title,
    author: fblog.author,
    likes: fblog.likes
  }
}

const mostBlogs = blogs => {
  const arr = blogs.map(p => p.author)
  const mblog = arr.reduce((ac, arr) => {
    ac[arr] = (ac[arr] || 0) +1
    return ac
  }, {})
  const values = Object.values(mblog)
  const max = Math.max(...values)
  const idx = values.findIndex(values => values === max)
  const name = Object.keys(mblog)[idx]
  return {
    author: name,
    blogs: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
