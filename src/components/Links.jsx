import React from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import clsx from 'classnames'

export const InternalLink = props => (
  <Link
    className="text-base cursor-pointer text-indigo-500 transition-colors duration-300 ease-in-out hover:text-indigo-300"
    {...props}
  />
)

export const ExternalLink = ({ to, className, ...props }) => (
  <a
    className={clsx(
      'cursor-pointer text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ease-in-out',
      className
    )}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
)

export const LocationAwareLink = props => {
  const location = useLocation()
  const [, baseRoute] = location.pathname.split('/')
  const isActiveRoute =
    location.pathname !== '/' && props.to === `/${baseRoute}`

  return (
    <Link
      className={clsx(
        'uppercase text-base cursor-pointer transition-colors duration-300 ease-in-out hover:text-indigo-300',
        isActiveRoute ? 'text-indigo-500' : 'text-gray-900 dark:text-gray-50'
      )}
      {...props}
    />
  )
}
