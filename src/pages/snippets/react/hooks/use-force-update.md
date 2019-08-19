---
keywords:
  - 'react'
  - 'hook'
  - 'hooks'
  - 'component'
language: 'jsx'
title: 'useForceUpdate Hook'
type: 'react'
---

React hook for force a component to re-render. Useful for components which use
a ref to render an external package into the DOM which React does not explicitly
have control over.

<!--more-->

```jsx
function useForceUpdate() {
  const [value, set] = React.useState(true)
  return () => set(!value)
}
```
