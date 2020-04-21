import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

const MostVotes = (props) => {
  const anecdotes = props.anecdotes
  let arr = Object.values(props.votes);
  let max = Math.max(...arr);
  let index  = arr.indexOf(max);
  return (
    <>
    {anecdotes[index]}
    <p>has {max} votes</p>
    </>
  )
}

const App = (props) => {
  const anecdotes = props.anecdotes
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({...points})

  const handleClick = () => {
    const value = Math.floor(Math.random()*6)
    console.log(value)
    setSelected(value)
  }

  const handleVoteClick = (index) => () => {
    votes[index] += 1
    console.log(votes)
    setVotes(JSON.parse(JSON.stringify(votes)))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}<br />
          has {votes[selected]} vote(s)</p>
      <button onClick={handleVoteClick(selected)}>
        vote
      </button>&nbsp;
      <button onClick={handleClick}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
