import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map((vote) =>
        vote.id !== id ? vote : action.data
      )
    default:
      return state
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const content = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: content,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newData = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newData
    })
  }
}

export const addVote = content => {
  return async dispatch => {
    const upData = await anecdoteService.updateData(content)
    dispatch({
      type: 'VOTE',
      data: upData
    })
  }
}

export default anecdoteReducer
