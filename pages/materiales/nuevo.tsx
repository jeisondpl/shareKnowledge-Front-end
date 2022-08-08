import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import { FormLoadMaterial } from '../../components'
import { Box, Card, Grid, Button, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { dev } from '../../components/utils/oops'

const Nuevomaterial = () => {
  const router = useRouter()

  const onSubmit = useCallback(async (values: any) => {
    router.push('/materiales')
  }, [])

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ flex: 'auto' }}>
            <h2>Crear Curso</h2>
          </Box>
          <Card sx={{ padding: '40px' }}>
            <FormLoadMaterial onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'} type={'material'} />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <DialogActions>
            <Button variant='contained' color='inherit' endIcon={<CancelIcon />} onClick={() => router.push('/materiales')}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary' onClick={() => dev()} endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Nuevomaterial
