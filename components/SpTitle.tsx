import React from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  title: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2'
  color?: string
  margin?: string
}

const SpTitle = ({ title, variant = 'h3', color, margin }: Props) => {
  return (
    <Box sx={{ flex: 'auto', margin: margin }}>
      <Typography component='div' variant={variant} color={color}>
        {title}
      </Typography>
    </Box>
  )
}

{/* <Box sx={{ display: 'flex', justifyContent: 'end', alignContent: 'space-between', alignItems: 'center', justifyItems: 'center' }}>
        <Box sx={{ flex: 'auto' }}>
          <h1>Usuarios</h1>
          <SpAlert error={error && error.message} loading={loading} />
        </Box>
      </Box> */}

export default SpTitle
