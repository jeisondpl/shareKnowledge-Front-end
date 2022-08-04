import { Alert, AlertColor } from '@mui/material'
import React from 'react'
import { color } from '../Themes/Color'

interface Props {
  type?: AlertColor | undefined
  children: JSX.Element | JSX.Element[]
}

const SpAlert = ({ children, type = 'error' }: Props) => {
  return (
    <Alert severity={type} style={{ borderLeft: `4px solid ${type !== 'error' ? color.verde : color.rojo}` }}>
      {children}
    </Alert>
  )
}

export default SpAlert
