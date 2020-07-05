const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((ac, blogs) => ac + blogs, 0)
}

module.exports = {
  dummy,
  totalLikes
}
