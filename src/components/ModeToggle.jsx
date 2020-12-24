import React from 'react'
import Tooltip from '@reach/tooltip'
import clsx from 'classnames'

import SunIcon from '../assets/svg/sun.inline.svg'
import MoonIcon from '../assets/svg/moon.inline.svg'
import { ModeContext } from '../contexts/ModeContext'

import '@reach/tooltip/styles.css'

const baseIconStyle =
  'absolute cursor-pointer transition-all duration-500 ease-in-out hover:text-gray-400 text-gray-50'
const hiddenStyle = 'opacity-0 invisible'
const shownStyle = 'opacity-100 visible'

function ModeToggle() {
  const { darkMode, setDarkMode } = React.useContext(ModeContext)
  return (
    <>
      <Tooltip label={`${darkMode ? 'Dark' : 'Light'} Theme`}>
        <span className="relative w-6 h-6" style={{ lineHeight: 0 }}>
          <SunIcon
            className={clsx(
              baseIconStyle,
              { [shownStyle]: !darkMode },
              { [hiddenStyle]: darkMode }
            )}
            onClick={() => setDarkMode(true)}
          />
          <MoonIcon
            className={clsx(
              baseIconStyle,
              { [hiddenStyle]: !darkMode },
              { [shownStyle]: darkMode }
            )}
            onClick={() => setDarkMode(false)}
          />
        </span>
      </Tooltip>
    </>
  )
}

export default ModeToggle
