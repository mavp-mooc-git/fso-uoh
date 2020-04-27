import React from 'react'

const Filter = ({value, event}) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={event} />
    </div>
  )
}

export default Filter
