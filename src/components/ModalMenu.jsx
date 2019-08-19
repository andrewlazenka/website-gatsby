import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  background-color: ${props => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 10;
`

const ModalMenu = ({ open = false, ...props }) =>
  open ? <ModalContainer {...props} /> : null

export default ModalMenu
