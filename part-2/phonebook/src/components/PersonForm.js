import React from 'react'

const PersonForm = ({action, valname, evname, valnumber, evnumber}) => {
  return (
    <form onSubmit={action}>
      <div>
        name: <input value={valname} onChange={evname} />
      </div>
      <div>
        number: <input value={valnumber} onChange={evnumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
