import React from 'react'
import { Link } from '@material-ui/core'

export default function LinkComponent({ children, onClick, marginTop, marginBotton, color }) {
  const style = { marginTop, marginBotton, color }

  return (
    <Link
      component="button"
      variant="body2"
      onClick={() => onClick()}
      style={style}
    >
      {children}
    </Link>
  )
}