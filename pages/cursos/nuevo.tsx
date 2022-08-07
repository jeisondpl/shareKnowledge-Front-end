import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import FormLoad from '../../components/Forms/FormLoadMaterial'
import { Box, Card, Grid, Button, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import stylesEditor from '../../styles/editor.module.scss'
import stylesForms from '../../styles/forms.module.scss'

const NuevoCurso = () => {
  const router = useRouter()

  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
    router.push('/materiales')
  }, [])

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ flex: 'auto' }}>
            <h2>Cargar Cursos</h2>
          </Box>
          <div className={stylesEditor.editorContainer}>
            <Card className={stylesForms.card}>
              <FormLoad onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'} />
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <DialogActions>
            <Button variant='contained' color='inherit' endIcon={<CancelIcon />} onClick={() => router.push('/cursos')}>
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
export default NuevoCurso
