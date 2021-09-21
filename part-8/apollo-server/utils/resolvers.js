const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      if(!args.author && !args.genre ) return books
      if( args.author && !args.genre ) return books.filter(b => {
        return b.author.name === args.author
      })
      if(!args.author && args.genre ) return books.filter(b => {
        return (b.genres.find(g => g === args.genre))
      })
      if( args.author && args.genre ) return books.filter(b => {
        return (b.author.name === args.author && b.genres.find(g => g === args.genre))
      })
    },
    allAuthors: async () => await Author.find({}).populate('book'),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: (root) => root.books.length
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let exist = false
      if (author) exist = true
      if (!author) author = new Author({ name: args.author })
      try {
        await author.save()
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      if (!exist) author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('NEW_BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        await author.save()
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
  
      return await user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'sekret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user.id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['NEW_BOOK_ADDED'])
    },
  },
}

module.exports = resolvers

