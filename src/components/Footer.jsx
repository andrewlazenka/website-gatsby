import React from 'react'

import SocialLinks from './SocialLinks'

const Footer = () => (
  <footer
    className="flex items-center w-full bg-indigo-500"
    style={{ minHeight: 100 }}
  >
    <div className="flex justify-between bg-indigo-500 px-5 w-3/4 max-w-3xl mx-auto">
      <SocialLinks />
    </div>
  </footer>
)

export default Footer
