const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'VOTE': {
      const id = action.data
      const voteToChange = state.find(n => n.id === id)
      const changedVote = {
        ...voteToChange, votes: voteToChange.votes + 1
      }
      return state.map(vote =>
        vote.id !== id ? vote : changedVote
      )
    }
    default:
      return state
  }
}

export const initialAnecdotes = (content) => {
  return {
    type: 'INIT_ANECDOTE',
    data: content,
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export default anecdoteReducer
