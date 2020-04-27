import React from 'react'

const Persons = ({obj, query}) => {
  const aux = obj.filter(p => p.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
  const result = aux.map(p => {
    return [p.name, p.number]
  })
  return (
    result.map((p) => {
      const [name, number] = [p[0], p[1]]
      return <p key={name}> {name} {number} </p>
    })
  )
}

export default Persons
