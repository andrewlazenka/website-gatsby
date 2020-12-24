import React from 'react'

export const ThemeContext = React.createContext()
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(window.__theme || null)

  React.useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => {
      setTheme(window.__theme)
    }
  }, [])

  function changeDarkMode(newMode) {
    setTheme(newMode)
    window.__setPreferredTheme(newMode)
  }

  return (
    <ThemeContext.Provider
      value={{ theme, isDarkTheme: theme === 'dark', setTheme: changeDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
