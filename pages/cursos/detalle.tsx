import { Box, Button, DialogActions, Grid } from '@mui/material'
import React from 'react'
import Layout from '../../layout/Layout'
import { useRouter } from 'next/router'
import CancelIcon from '@mui/icons-material/Cancel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ReactPlayer from 'react-player/youtube'

const Detalle = () => {
  const router = useRouter()
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ flex: 'auto' }}>
            <h2>Detalle del cursos</h2>
            <ReactPlayer url='https://www.youtube.com/watch?v=jVCVCPlEFhc&ab_channel=JGAITPro' />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <DialogActions>
            <Button variant='contained' color='inherit' startIcon={<ArrowBackIcon />} onClick={() => router.push('/cursos')}>
              Atrás
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Detalle
