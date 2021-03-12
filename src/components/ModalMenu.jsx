import React from 'react'
import clsx from 'classnames'

const ModalMenu = ({ open = false, ...props }) => (
  <div
    className={clsx(
      'absolute flex flex-col w-full h-screen z-40 bg-gray-50 dark:bg-gray-900 justify-center inset-0 transition-all duration-300 ease-in-out',
      open ? 'opacity-100 visible' : 'opacity-0 invisible'
    )}
    {...props}
  />
)

export default ModalMenu
