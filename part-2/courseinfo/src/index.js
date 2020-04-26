import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h2>{name}</h2>

const Part = ({part, exercise}) => <p>{part} {exercise}</p>

const Content = ({parts, idx}) => {
  const array = parts.map(p => p.exercises)
  const total = array.reduce((ac, p) => ac += p )
  const partial = parts.map(p => {
    return (
      <Part key={`${idx}.${p.id}`}
            part={p.name}
            exercise={p.exercises} />
    )
  })
  return (
    <>
      {partial}
      <p>
        <strong>total of {total} exercices</strong>
      </p>
    </>
  )
}

const Course = ({courses}) => courses.map(p => {
  return (
    <div key={p.id}>
      <Header name={p.name} />
      <Content parts={p.parts} idx={p.id} />
    </div>
  )
})

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      <h1>Web Development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
