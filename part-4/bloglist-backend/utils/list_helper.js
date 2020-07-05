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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
