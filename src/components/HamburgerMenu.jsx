import React from 'react'
import styled, { css } from 'styled-components'

const top1 = '24px'
const top2 = '32px'
const top3 = '40px'

const HamburgerMenuContainerStyled = css`
  cursor: pointer;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  height: 100%;
  width: 32px;
  z-index: 20;

  span:nth-child(1) {
    top: ${top1};
  }

  span:nth-child(2),
  span:nth-child(3) {
    top: ${top2};
  }

  span:nth-child(4) {
    top: ${top3};
  }
`

const HamburgerMenuContainerOpenStyle = css`
  span:nth-child(1) {
    top: ${top2};
    width: 0%;
    left: 50%;
  }

  span:nth-child(2) {
    transform: rotate(45deg);
  }

  span:nth-child(3) {
    transform: rotate(-45deg);
  }

  span:nth-child(4) {
    top: ${top2};
    width: 0%;
    left: 50%;
  }
`

const HamburgerMenuStrip = styled.span`
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: ${props => props.theme.fontColor};
  border-radius: 50px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
`

const HamburgerMenu = ({ active, onClick }) => {
  let style = HamburgerMenuContainerStyled
  if (active) {
    style = [...style, ...HamburgerMenuContainerOpenStyle]
  }
  return (
    <div onClick={onClick} css={style}>
      <HamburgerMenuStrip />
      <HamburgerMenuStrip />
      <HamburgerMenuStrip />
      <HamburgerMenuStrip />
    </div>
  )
}

export default HamburgerMenu
