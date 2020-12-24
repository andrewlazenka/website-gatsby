import React from 'react'
import Toggle from 'react-toggle'
import Tooltip from '@reach/tooltip'

import { ModeContext } from '../contexts/ModeContext'

import 'react-toggle/style.css'
import '@reach/tooltip/styles.css'
import './ModeToggle.css'

function ModeToggle() {
  const { darkMode, setDarkMode } = React.useContext(ModeContext)
  return (
    <Tooltip label={`${darkMode ? 'Dark' : 'Light'} Theme`}>
      <span style={{ lineHeight: 0 }}>
        <Toggle
          checked={darkMode}
          className="mode-toggle"
          icons={false}
          onChange={() => setDarkMode(!darkMode)}
        />
      </span>
    </Tooltip>
  )
}

export default ModeToggle
