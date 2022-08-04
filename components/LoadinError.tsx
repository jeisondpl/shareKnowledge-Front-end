import React from 'react'
import { CircularProgress, Box } from '@mui/material'
import SpAlert from './SpAlert'
import { respMesage } from '../types/Commons'

interface Props {
  loading: boolean
  mensaje: respMesage | undefined
}

const LoadinError = ({ loading, mensaje }: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {loading && <CircularProgress color='success' />}
      {mensaje?.error && (
        <SpAlert type='error'>
          <>{mensaje.error.message}</>
        </SpAlert>
      )}
      {mensaje?.mensaje && (
        <SpAlert type='success'>
          <>{mensaje.mensaje}</>
        </SpAlert>
      )}
    </Box>
  )
}

export default LoadinError
