import storage from '../utils/comments'

const comments = [
  'awesome article',
  'a must read for every developer',
  'very good posts',
  'great article',
  'excelent blog post'
]

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return action.data
    case 'ADD_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export const initialComments = (blogs) => {
  let data = storage.loadComments()
  if(data) {
    return dispatch => {
      dispatch({
        type: null,
        data: null
      })
    }
  } else {
    data = []
    for (let i = 0; i < 5; i++) {
      const blog = blogs[Math.floor(Math.random() * blogs.length)]
      const commt = comments[Math.floor(Math.random() * comments.length)]
      data.push({
        'id': blog.id,
        'desc': commt,
        'title': blog.title
      })
    }

    let result = data.reduce((a, { id, desc, title }) => {
      let item = a.find(el => el.id === id);
      if(!item) return [...a, {id, 'desc': [desc], 'title': title }];
      item.desc.push(desc)
      item.title = title
      return a;
    },[])

    storage.initComments(result)
    const datastore = storage.loadComments()
    return dispatch => {
      dispatch({
        type: 'GET_COMMENTS',
        data: datastore
      })
    }
  }
}

export const getComments = () => {
  const data = storage.loadComments()
  return dispatch => {
    dispatch({
      type: 'GET_COMMENTS',
      data: data
    })
  }
}

export const createComment = (blog, content) => {
  return async dispatch => {
    const data = storage.loadComments()
    let cmmt = data.find(d => d.id === blog.id )
    if(cmmt) {
      cmmt.desc.push(content)
      storage.saveComments(data)
      dispatch({
        type: 'GET_COMMENTS',
        data
      })
    } else {
      let add = {
        'id': blog.id,
        'desc': [content],
        'title': blog.title
      }
      storage.saveComments([...data, add])
      dispatch({
        type: 'ADD_COMMENT',
        data: add
      })
    }
  }
}

export const deleteComment = (id) => {
  let data = storage.loadComments()
  const result = data.filter(c => c.id !== id).map(c => c)
  storage.initComments(result)
  const datastore = storage.loadComments()
  return dispatch => {
    dispatch({
      type: 'GET_COMMENTS',
      data: datastore
    })
  }
}

export default commentReducer
