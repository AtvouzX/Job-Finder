import { NavLink as RRNavLink } from 'react-router-dom'
import React from 'react'

interface Props extends React.ComponentProps<typeof RRNavLink> {}

export function NavLink(props: Props) {
  return (
    <RRNavLink
      {...props}
      className={({ isActive }) =>
        `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'} p-2` +
        (props.className ? ` ${props.className}` : '')
      }
    />
  )
}

export default NavLink
