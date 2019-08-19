import React from 'react'
import styled from 'styled-components'

import SocialLinks from './SocialLinks'

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.footerBgColor};
  min-height: 100px;
`

const FooterContainerInterior = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.footerBgColor};
  padding: 0 1.3125rem;
  width: 70%;
  max-width: 850px;
  margin: 0 auto;
`

function Footer() {
  return (
    <FooterContainer>
      <FooterContainerInterior>
        <SocialLinks />
      </FooterContainerInterior>
    </FooterContainer>
  )
}

export default Footer
