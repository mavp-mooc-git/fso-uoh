import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
      bookCount
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
      genres
    }
  }
  ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($findGenre: String!) {
    allBooks(genre: $findGenre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
      genres
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const GET_ME = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`

export const NEW_BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
      genres
    }
  }
  ${BOOK_DETAILS}
`
