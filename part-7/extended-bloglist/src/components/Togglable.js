import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import { ScButton } from  '../utils/styledComponents'
import storeTheme from '../utils/theme'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const theme = storeTheme.loadTheme()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {(theme.name === 'styled') ?
        <ScButton variant="secondary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </ScButton> :
        <Button variant="secondary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        {(theme.name === 'styled') ?
        <ScButton variant="secondary" onClick={toggleVisibility}>
          cancel
        </ScButton> :
        <Button variant="secondary" onClick={toggleVisibility}>
          cancel
        </Button>}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable

