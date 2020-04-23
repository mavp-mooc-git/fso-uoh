import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h1>{name}</h1>

const Part = ({part, exercise}) => <p>{part} {exercise}</p>

const Content = ({parts}) => {
  const array = parts.map(p => p.exercises)
  const total = array.reduce((ac, p) => ac += p )
  return (
    <>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
      <Part part={parts[3].name} exercise={parts[3].exercises} />
      <p><strong>total of {total} exercices</strong></p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
