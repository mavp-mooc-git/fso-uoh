import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const filters = props.anecdotes.filter(p => {
    const e1 = p.content.toString().toLowerCase()
    const e2 = props.filterData.toString().toLowerCase()
    return e1.indexOf(e2) > -1
  })

  const vote = async (data) => {
    props.addVote(data)
    props.setNotification(`you voted: '${data.content}'`, 5)
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

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    anecdotes: state.anecdotes,
    filterData: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
