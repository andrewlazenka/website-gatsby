import React from 'react'

import SocialLinks from 'src/components/SocialLinks'
import AndrewLogo from 'src/assets/png/AndrewLogo.png'
import { LocationAwareLink } from 'src/components/Links'

const year = new Date().getFullYear()
const copyright = `© ${year} Andrew Lazenka. All Rights Reserved.`

const Footer = () => (
  <footer
    className="flex items-center w-full min-h-[300px] bg-gradient-to-b from-gray-50 via-grey-300 to-indigo-500 dark:from-gray-900 dark:to-gray-600 transition-all duration-300 ease-in-out"
  >
    <div className="flex justify-between flex-col md:flex-row px-5 w-3/4 max-w-5xl mx-auto">
      <div>
        <div className="flex justify-center pb-6 md:p-0">
          <LocationAwareLink to="/">
            <img
              src={AndrewLogo}
              alt="Site Logo - Andrew Lazenka"
              className="h-10"
            />
          </LocationAwareLink>
        </div>
        <div className="md:block hidden text-center opacity-50 text-xs">
          {copyright}
        </div>
      </div>
      <div className="flex justify-between w-full sm:w-3/4 md:w-1/2 mx-auto md:m-0 pb-6 md:p-0">
        <SocialLinks />
      </div>
      <div className="md:hidden block text-center opacity-50 text-xs">
        {copyright}
      </div>
    </div>
  </footer>
)

export default Footer
