import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import Divider from '@mui/material/Divider'
import { useQuery } from '@apollo/client'
// import { GET_ALL } from '../../graphQL/front/Querys/Materiales'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

import { SpCard, SpAlert } from '../../components'

export interface Material {
  id: string
  titulo: string
  categoria: string
  descripcion: string
  usuario: string
}
const Cursos = () => {
  // const router = useRouter()
  // const { data, loading, error } = useQuery<{ obtenerTodosMateriales: Material[] }, Material>(GET_ALL)

  // const onEditOronDelete = useCallback((rowData: any, proceso: string) => {
  //   if (proceso === 'edit') {
  //     console.log('edit', rowData, proceso)
  //   }
  //   if (proceso === 'delete') {
  //     console.log('delete', rowData, proceso)
  //   }
  // }, [])

  return (
    <Layout>
      <SpAlert error={''} loading={false} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Gestion de Materiales</h1>
        </Grid>
        <Grid item md={5} xs={12} xl={3}>
          <SpCard
            title={'Materiales'}
            descripcion='Gestion de cursos asociar curso con materiales'
            url={'/materiales/materiales'}
            image='https://cdn-icons-png.flaticon.com/512/46/46862.png'
          />
        </Grid>
        <Grid item md={5} xs={12} xl={3}>
          <SpCard
            title={'Categoria'}
            url={'/materiales/categoria'}
            descripcion='Asocia un curso a docentes'
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNTT6j2b3btiGoSaXxbEJRXXegW6zGQ5VlMsESvKOweTij1LzYI2bRKwSTpsME4QkvLAI&usqp=CAU'
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Cursos
