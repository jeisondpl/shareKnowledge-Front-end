import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import { FormLoadMaterial } from '../../components'
import { Box, Card, Grid, Button, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import stylesEditor from '../../styles/editor.module.scss'
import stylesForms from '../../styles/forms.module.scss'

const nuevomaterial = () => {
  const router = useRouter()

  const onSubmit = useCallback(async (values: any) => {
    router.push('/materiales')
  }, [])

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ flex: 'auto' }}>
            <h2>Cargar Material</h2>
          </Box>
          <div className={stylesEditor.editorContainer}>
            <Card className={stylesForms.card}>
              <FormLoadMaterial onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'} />
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <DialogActions>
            <Button variant='contained' color='inherit' endIcon={<CancelIcon />} onClick={() => router.push('/materiales')}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary' endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Layout>
  )
}

{
  /* <SpEditor readOnly={true} handleChange={(e: any) => {}} initialText={'hola'} /> */
}
export default nuevomaterial
