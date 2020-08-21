import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { msgVote, deleteMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filterData = useSelector(state => state.filter)

  const message = (content) => {
    dispatch(msgVote(content))
    setTimeout(() => {
      dispatch(deleteMessage())
    }, 5000)
  }

  const filters = anecdotes.filter(p => {
    const e1 = p.content.toString().toLowerCase()
    const e2 = filterData.toString().toLowerCase()
    return e1.indexOf(e2) > -1
  })

  const vote = async (data) => {
    dispatch(addVote(data))
    message(data.content)
  }

  return (
    <>
      {filters.map(anecdote => anecdote)
      .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} &nbsp;
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )
      }
    </>
  )
}

export default AnecdoteList
