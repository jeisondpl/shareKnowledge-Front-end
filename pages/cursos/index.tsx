import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import Divider from '@mui/material/Divider'
import { useQuery } from '@apollo/client'
import { GET_ALL } from '../../graphQL/front/Querys/Materiales'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import SpAlert from '../../components/SpAlert'
import { SpCard, InputSearch } from '../../components'

export interface Material {
  id: string
  titulo: string
  categoria: string
  descripcion: string
  usuario: string
}
const Cursos = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<{ obtenerTodosMateriales: Material[] }, Material>(GET_ALL)

  const onEditOronDelete = useCallback((rowData: any, proceso: string) => {
    if (proceso === 'edit') {
      console.log('edit', rowData, proceso)
    }
    if (proceso === 'delete') {
      console.log('delete', rowData, proceso)
    }
  }, [])

  return (
    <Layout>
      <SpAlert error={error?.message} loading={loading} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Gestion de cursos</h1>
        </Grid>
        <Grid item md={5} xs={12} xl={3}>
          <SpCard title={'Cursos'} descripcion='Gestion de cursos asociar curso con materiales' url={'/cursos/list'} image='https://cdn-icons-png.flaticon.com/512/46/46789.png' />
        </Grid>
        <Grid item md={5} xs={12} xl={3}>
          <SpCard title={'Asociar cursos'} url={'/cursos/detalle'} descripcion='Asocia un curso a docentes' image='https://cdn-icons-png.flaticon.com/512/115/115921.png' />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Cursos
