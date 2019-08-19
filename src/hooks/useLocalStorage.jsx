import React from 'react'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(initialValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Save state
      setStoredValue(value)
      // Save to local storage
      typeof window !== 'undefined' &&
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  React.useEffect(() => {
    try {
      // Get from local storage by key
      const item =
        typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      // Parse stored json or if none return initialValue
      if (item) {
        setStoredValue(JSON.parse(item))
      } else {
        setStoredValue(initialValue)
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      setStoredValue(initialValue)
    }
  }, [storedValue])

  return [storedValue, setValue]
}
