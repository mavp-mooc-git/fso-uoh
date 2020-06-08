import React from 'react'

const Persons = ({obj, query, callback}) => {
  const aux = () => obj.filter(p => p.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
  const result = () => aux().map(p => {
    return [p.name, p.number, p.id]
  })
  return (
    result().map((p) => {
      const [name, number, id] = [p[0], p[1], p[2]]
      return <p key={name}>
               {name} {number}
               <button type="button" onClick={() => callback(id, obj)}>
                 delete
               </button>
             </p>
    })
  )
}

export default Persons
