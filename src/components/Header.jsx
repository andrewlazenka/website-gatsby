import React from 'react'
import styled from 'styled-components'

import HamburgerMenu from './HamburgerMenu'
import ModalMenu from './ModalMenu'
import ModeToggle from './ModeToggle'
import AndrewLogo from '../assets/png/AndrewLogo.png'
import { LocationAwareLink } from '../components/Links'
import SocialLinks from '../components/SocialLinks'
import useWindowSize from '../hooks/useWindowSize'

const AppHeader = styled.header`
  display: flex;
  height: 75px;
  justify-content: space-between;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`

const NavbarItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: calc(100% - 4px);
  padding: 0 1.73rem;
`

const NavItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const SiteLogo = styled.img`
  height: 32px;
`

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

const MenuModelItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ItemPadding = styled.div`
  padding: 24px 0;
  margin: 0 auto;
`

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  min-height: 100px;
  padding: 0 10%;
`

export default () => {
  const [menuModalOpen, setMenuModalOpen] = React.useState(false)
  const { size } = useWindowSize()
  return (
    <AppHeader>
      <LocationAwareLink to="/">
        <NavbarItem>
          <SiteLogo src={AndrewLogo} alt="Site Logo - Andrew Lazenka" />
        </NavbarItem>
      </LocationAwareLink>
      <NavItemContainer>
        {size === 'mobile' ? (
          <React.Fragment>
            <ItemPadding>
              <ModeToggle />
            </ItemPadding>
            <NavbarItem style={{ cursor: 'default' }}>
              <HamburgerMenu
                active={menuModalOpen}
                onClick={() => setMenuModalOpen(!menuModalOpen)}
              />
              <ModalMenu open={menuModalOpen}>
                <MenuModelItemsContainer>
                  {menuItems.map(({ name, to }, index) => (
                    <ItemPadding key={`${name}-${index}`}>
                      <LocationAwareLink
                        to={to}
                        onClick={() => setMenuModalOpen(false)}
                      >
                        {name}
                      </LocationAwareLink>
                    </ItemPadding>
                  ))}
                  <SocialLinksContainer>
                    <SocialLinks />
                  </SocialLinksContainer>
                </MenuModelItemsContainer>
              </ModalMenu>
            </NavbarItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {menuItems.map(({ name, to }, index) => (
              <LocationAwareLink key={`${name}-${index}`} to={to}>
                <NavbarItem>{name}</NavbarItem>
              </LocationAwareLink>
            ))}
            <NavbarItem>
              <ModeToggle />
            </NavbarItem>
          </React.Fragment>
        )}
      </NavItemContainer>
    </AppHeader>
  )
}
