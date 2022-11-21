import { CircularProgress, Grid } from '@mui/material'
import React from 'react'
import color from '../Themes/Color'

type color = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | undefined

interface Props {
  loading: boolean
  color?: color
}

const SpLoading = ({ loading, color = 'primary' }: Props) => {
  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      {loading && <CircularProgress color={color}  />}
    </Grid>
  )
}

export default SpLoading
