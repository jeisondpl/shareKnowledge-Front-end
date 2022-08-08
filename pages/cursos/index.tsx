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
        <>
          <Grid item xs={12}>
            <InputSearch />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <h2>Mis cursos</h2>
          </Grid>
          {data &&
            data.obtenerTodosMateriales.map((item) => (
              <Grid key={item.id} item md={3} xs={6} rowSpacing={3}>
                <SpCard key={item.id} title={item.titulo} url={'/cursos/detalle'} />
              </Grid>
            ))}

          <Grid item xs={12}>
            <Divider />
            <h2>Todos los cursos</h2>
          </Grid>
          {data &&
            data.obtenerTodosMateriales.map((item) => (
              <Grid key={item.id} item md={3} xs={6} rowSpacing={3}>
                <SpCard key={item.id} title={item.titulo} url={'/cursos/detalle'} />
              </Grid>
            ))}
        </>
      </Grid>
    </Layout>
  )
}

export default Cursos
