import React from 'react'

const TABLET_BREAKPOINT = 1024
const MOBILE_BREAKPOINT = 768

function calcHeight() {
  if (typeof window != 'undefined')
    return window.innerHeight > 0
      ? Math.min(window.innerHeight, window.screen.height)
      : window.screen.height
  return 0
}

function calcWidth() {
  if (typeof window != 'undefined')
    return window.innerWidth > 0
      ? Math.min(window.innerWidth, window.screen.width)
      : window.screen.width
  return 0
}

function calcSize(width) {
  if (width >= TABLET_BREAKPOINT) {
    return 'desktop'
  }
  if (width < TABLET_BREAKPOINT && width >= MOBILE_BREAKPOINT) {
    return 'tablet'
  }
  return 'mobile'
}

export default function useWindowSize({ listen = true } = {}) {
  const [size, setSize] = React.useState({
    width: calcWidth(),
    height: calcHeight(),
    size: calcSize(calcWidth()),
  })

  React.useEffect(() => {
    if (listen && typeof window != 'undefined') {
      window.addEventListener('resize', handler)
      return () => {
        window.removeEventListener('resize', handler)
      }
    }
  }, [listen])

  function handler() {
    const height = calcHeight()
    const width = calcWidth()
    const size = calcSize(width)
    setSize({ width, height, size })
  }

  return size
}
