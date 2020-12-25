import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const pStyle = {
  fontSize: '16px'
}

const dispatch = (action) => {
  store.dispatch({
    type: action
  })
}

const Header = () => <h1>give feedback</h1>

const Button = ({action, text}) => {
  return <button onClick={() => dispatch(action)}>{text}</button>
}

const Statistics = () => {
  const good = store.getState().good
  const ok = store.getState().ok
  const bad = store.getState().bad
  const all = good + ok + bad
  const average = (all > 0) ? (good - bad) / all : 0
  const positive = (all > 0) ? (good / all) * 100 : 0

  if(all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
        <pre>
          state: &#123;
            good: {good},
            neutral: {ok},
            bad: {bad}&nbsp;
          &#125;
        </pre>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <pre style={pStyle}>
        good      :  {good} <br />
        neutral   :  {ok} <br />
        bad       :  {bad} <br />
        all       :  {all} <br />
        average   :  {average} <br />
        positive  :  {positive} %
      </pre>
    </>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Button action='GOOD' text='good' /> &nbsp;
      <Button action='OK' text='neutral' /> &nbsp;
      <Button action='BAD' text='bad' /> &nbsp;
      <Button action='ZERO' text='reset stats' /> &nbsp;
      <Button action='OTHER' text='other actions' /> &nbsp;
      <br />
      <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
