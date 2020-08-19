const initmsg = ''

const notificationReducer = (state = initmsg, action) => {
  //console.log('state:', state)
  switch (action.type) {
    case 'NEW_MSG':
      const newmsg = `a new anecdote: "${action.data}" added`
      return newmsg
    case 'DEL_MSG':
      return initmsg
    case 'VOTE_MSG':
      const votemsg = `you voted: "${action.data}"`
      return votemsg
    default:
      return state
  }
}

export const createMessage = (content) => {
  return {
    type: 'NEW_MSG',
    data: content
  }
}

export const deleteMessage = () => {
  return {
    type: 'DEL_MSG'
  }
}

export const msgVote = (content) => {
  return {
    type: 'VOTE_MSG',
    data: content
  }
}

export default notificationReducer
