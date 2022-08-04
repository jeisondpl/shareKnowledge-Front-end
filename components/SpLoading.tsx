import { CircularProgress } from '@mui/material'
import React from 'react'
import { color } from '../Themes/Color'

type color = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | undefined

interface Props {
  loading: boolean
  color?: color
}

const SpLoading = ({ loading, color = 'primary' }: Props) => {
  return <>{loading && <CircularProgress color={color} />}</>
}

export default SpLoading
