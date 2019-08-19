import React from 'react'
import styled from 'styled-components'

import TrianglesBlue from '../assets/svg/triangles-blue.svg'
import TrianglesGrey from '../assets/svg/triangles-grey.svg'
import { ModeContext } from '../contexts/ModeContext'

const HeroBanner = styled.div`
  background-image: url(${props => props.svg});
  background-position: top left;
  background-size: cover;
  padding-top: 84px;
  width: 100%;
`

export default props => {
  const { darkMode } = React.useContext(ModeContext)

  return (
    <HeroBanner svg={darkMode ? TrianglesGrey : TrianglesBlue} {...props} />
  )
}
