import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  const {text, value} = props
  const tableStyle = {
    width: "40%"
  }
  let newvalue = value
  if(text === "positive") {
    newvalue = value + " %"
  }
  return (
    <>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tableStyle}>{text}</td>
            <td>{newvalue}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props
  if(all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <div>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={all} />
        <Statistic text="average" value ={average} />
        <Statistic text="positive" value ={positive} />
      </div>
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

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text='good' />&nbsp;
      <Button onClick={handleNeutralClick} text='neutral' />&nbsp;
      <Button onClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}
                  all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
