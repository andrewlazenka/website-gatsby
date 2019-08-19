import React from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { css } from 'styled-components'

const LinkStyles = css`
  color: ${props => props.theme.blueColor};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

export const InternalLink = props => <Link css={LinkStyles} {...props} />

export const ExternalLink = ({ to, children, ...props }) => (
  <a
    css={LinkStyles}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
)

export const LocationAwareLink = props => (
  <Location>
    {({ location }) => {
      const [, baseRoute] = location.pathname.split('/')
      const activeRoute =
        location.pathname !== '/' && props.to === `/${baseRoute}`

      const activeRouteStyle = activeRoute
        ? css`
            color: ${({ theme }) => theme.blueColor};
            font-size: 16px;
            text-transform: uppercase;
            height: inherit;
          `
        : css`
            color: ${({ theme }) => theme.fontColor};
            font-size: 16px;
            text-transform: uppercase;
            height: inherit;
          `

      return <InternalLink css={activeRouteStyle} {...props} />
    }}
  </Location>
)
