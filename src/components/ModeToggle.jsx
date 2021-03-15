import React from 'react'
import clsx from 'classnames'

import SunIcon from '../assets/svg/sun.inline.svg'
import MoonIcon from '../assets/svg/moon.inline.svg'

const baseIconStyle =
  'absolute cursor-pointer transition duration-300 ease-in-out text-gray-900 dark:text-gray-50 hover:text-indigo-300 dark:hover:text-indigo-300 text-gray-50'
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
    <span className="relative w-6 h-6 leading-[0px]">
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
  )
}

export default ModeToggle
