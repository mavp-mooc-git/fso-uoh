import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote => anecdote)
      .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} &nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )
      }
    </>
  )
}

export default AnecdoteList
