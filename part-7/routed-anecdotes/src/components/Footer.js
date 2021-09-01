import React from 'react'

const Footer = () => {
  const hline = {
    borderTop: 1,
    color: 'silver',
    width: '98%'
  }
  return (
    <div>
      <hr style={hline} />
      Anecdote app for&nbsp;
      <a href='https://courses.helsinki.fi/fi/tkt21009'>
        Full Stack -websovelluskehitys
      </a>.
      <br />
      See&nbsp;
      <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
        https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
      </a> for the source code.
    </div>
  )
}

export default Footer
