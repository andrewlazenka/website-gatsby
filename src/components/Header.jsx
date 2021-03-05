import React from 'react'

import HamburgerMenu from 'src/components/HamburgerMenu'
import ModalMenu from 'src/components/ModalMenu'
import ModeToggle from 'src/components/ModeToggle'
import AndrewLogo from 'src/assets/png/AndrewLogo.png'
import { LocationAwareLink } from 'src/components/Links'
import SocialLinks from 'src/components/SocialLinks'

const menuItems = [
  {
    name: 'Snippets',
    to: '/snippets',
  },
  {
    name: 'Work & Experience',
    to: '/work-experience',
  },
]

const MobileMenu = ({ onClose }) => (
  <div className="flex flex-col items-center">
    {menuItems.map(({ name, to }, index) => (
      <div className="flex py-6 items-center" key={`${name}-${index}`}>
        <LocationAwareLink to={to} onClick={onClose}>
          {name}
        </LocationAwareLink>
      </div>
    ))}
    <div className="flex justify-around items-center w-4/5 py-6">
      <SocialLinks />
    </div>
  </div>
)

export default () => {
  const [menuModalOpen, setMenuModalOpen] = React.useState(false)
  return (
    <div className="absolute z-10 top-0 left-0 w-full">
      <nav className="flex flex-row-reverse sm:flex-row justify-between mx-auto max-w-5xl w-3/4">
        <div className="hidden sm:flex items-center p-5 xs:p-7">
          <LocationAwareLink to="/">
            <img
              src={AndrewLogo}
              alt="Site Logo - Andrew Lazenka"
              className="h-6 xs:h-8"
            />
          </LocationAwareLink>
        </div>
        <div className="flex">
          {menuItems.map(({ name, to }, index) => (
            <div key={name} className="hidden md:flex items-center p-7">
              <LocationAwareLink key={`${name}-${index}`} to={to}>
                {name}
              </LocationAwareLink>
            </div>
          ))}
          <div className="flex items-center p-7">
            <ModeToggle />
          </div>
          <div className="flex items-center p-7 cursor-default md:hidden">
            <HamburgerMenu
              active={menuModalOpen}
              onClick={() => setMenuModalOpen(!menuModalOpen)}
            />
          </div>
        </div>
        <ModalMenu open={menuModalOpen}>
          <MobileMenu onClose={() => setMenuModalOpen(false)} />
        </ModalMenu>
        </nav>
    </div>
  )
}
