import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const pStyle = {
  fontSize: '16px'
}

const App = () => {
  return (
    <div>
      <br />
      <button onClick={() => console.log('good')}>good</button> &nbsp;
      <button onClick={() => console.log('neutral')}>neutral</button>  &nbsp;
      <button onClick={() => console.log('bad')}>bad</button> &nbsp;
      <button onClick={() => console.log('reset')}>reset stats</button>  &nbsp;
      <button onClick={() => console.log('nothing')}>no actions</button>
      <br />
      <pre style={pStyle}>
        good      =  {store.getState().good} <br />
        neutral   =  {store.getState().ok} <br />
        bad       =  {store.getState().bad} <br />
        all       =  0 <br />
        average   =  0 <br />
        positive  =  0 %
      </pre>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
