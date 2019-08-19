import React from 'react'
import styled from 'styled-components'

import SocialLinks from './SocialLinks'

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  background-color: ${({ theme }) => theme.footerBgColor};
  min-height: 100px;
  padding: 0 10%;
`

function Footer() {
  return (
    <FooterContainer>
      <SocialLinks />
    </FooterContainer>
  )
}

export default Footer
