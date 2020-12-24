import React from 'react'
import Tooltip from '@reach/tooltip'
import clsx from 'classnames'

import SunIcon from '../assets/svg/sun.inline.svg'
import MoonIcon from '../assets/svg/moon.inline.svg'
import { ThemeContext } from '../contexts/ThemeContext'

const baseIconStyle =
  'absolute cursor-pointer transition-all duration-500 ease-in-out hover:text-gray-400 text-gray-50'
const hiddenStyle = 'opacity-0 invisible'
const shownStyle = 'opacity-100 visible'

function ModeToggle() {
  const { isDarkTheme, setTheme } = React.useContext(ThemeContext)
  return (
    <Tooltip label={`${isDarkTheme ? 'Dark' : 'Light'} Theme`}>
      <span className="relative w-6 h-6" style={{ lineHeight: 0 }}>
        <SunIcon
          className={clsx(
            baseIconStyle,
            { [shownStyle]: !isDarkTheme },
            { [hiddenStyle]: isDarkTheme }
          )}
          onClick={() => setTheme('dark')}
        />
        <MoonIcon
          className={clsx(
            baseIconStyle,
            { [hiddenStyle]: !isDarkTheme },
            { [shownStyle]: isDarkTheme }
          )}
          onClick={() => setTheme('light')}
        />
      </span>
    </Tooltip>
  )
}

export default ModeToggle
