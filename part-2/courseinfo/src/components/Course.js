import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = ({courses}) => courses.map(p => {
  return (
    <div key={p.id}>
      <Header name={p.name} />
      <Content parts={p.parts} idx={p.id} />
    </div>
  )
})

export default Course
