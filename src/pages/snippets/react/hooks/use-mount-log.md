---
keywords:
  - 'react'
  - 'hook'
  - 'hooks'
  - 'component'
language: 'jsx'
title: 'useMountLog Hook'
type: 'react'
---

React hook to monitor when a component mount and unmounts. Useful for debugging.

<!--more-->

```jsx
function useMountLog(componentName) {
  React.useEffect(() => {
    console.warn(`useMountLog: ${componentName} Mounted`)
    return () => {
      console.warn(`useMountLog: Unmounted ${componentName}`)
    }
  }, [])
}
```
