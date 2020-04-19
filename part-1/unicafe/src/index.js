import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props
  return (
    <>
      <h2>statistics</h2>
      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {all} <br />
        average {average} <br />
        positive {positive} %
      </p>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (all > 0) ? (good - bad) / all : 0
  const positive = (all > 0) ? (good / all) * 100 : 0

  return (
    <div>
      <Header />
      <button onClick={() => setGood(good + 1)}>
        good
      </button> &nbsp;
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button> &nbsp;
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad}
                  all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
