import React from 'react'
import Tooltip from '@reach/tooltip'
import clsx from 'classnames'

import SunIcon from '../assets/svg/sun.inline.svg'
import MoonIcon from '../assets/svg/moon.inline.svg'

const baseIconStyle =
  'absolute cursor-pointer transition-all duration-500 ease-in-out hover:text-gray-400 text-gray-50'
const hiddenStyle = 'opacity-0 invisible'
const shownStyle = 'opacity-100 visible'

function ModeToggle() {
  // fix for Gatsby SSR when window is not yet defined
  let initialTheme = null
  if (typeof window !== `undefined`) {
    initialTheme = window.__theme
  }
  const [theme, setTheme] = React.useState(initialTheme)

  React.useEffect(() => {
    window.__onThemeChange = () => {
      setTheme(window.__theme)
    }
    setTheme(window.__theme)
  }, [])

  function changeTheme(newMode) {
    setTheme(newMode)
    window.__setPreferredTheme(newMode)
  }

  const isDarkTheme = theme === 'dark'

  // fix for Gatsby SSR when window is not yet defined
  if (theme === null) {
    return <div className="h-6 w-6" />
  }

  return (
    <Tooltip label={`${isDarkTheme ? 'Dark' : 'Light'} Theme`}>
      <span className="relative w-6 h-6" style={{ lineHeight: 0 }}>
        <SunIcon
          className={clsx(
            baseIconStyle,
            { [shownStyle]: !isDarkTheme },
            { [hiddenStyle]: isDarkTheme }
          )}
          onClick={() => changeTheme('dark')}
        />
        <MoonIcon
          className={clsx(
            baseIconStyle,
            { [hiddenStyle]: !isDarkTheme },
            { [shownStyle]: isDarkTheme }
          )}
          onClick={() => changeTheme('light')}
        />
      </span>
    </Tooltip>
  )
}

export default ModeToggle
