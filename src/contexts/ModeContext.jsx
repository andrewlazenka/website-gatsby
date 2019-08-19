import React from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

export const ModeContext = React.createContext()
export const ModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ModeContext.Provider>
  )
}
