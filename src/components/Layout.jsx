import React from 'react'

const Layout = props => (
  <main
    style={{ minHeight: 'calc(100vh - 292px)' }}
    className="mx-auto pt-28 pb-16 px-6 max-w-3xl w-3/4"
    {...props}
  />
)

export default Layout
