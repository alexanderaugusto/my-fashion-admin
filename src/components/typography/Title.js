import React from 'react'
import { Typography } from '@material-ui/core'

export default function Title({ children, marginTop, marginBottom, marginLeft, marginRight, color, fontWeight,
  fontSize }) {
  const style = { marginTop, marginBottom, color, fontWeight, fontSize, marginLeft, marginRight }

  return (
    <Typography variant="h5" style={style}>
      {children}
    </Typography>
  )
}