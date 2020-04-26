import React from 'react'
import Part from './Part'

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

export default Content
