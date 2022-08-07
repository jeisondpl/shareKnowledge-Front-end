import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import { useQuery } from '@apollo/client'
import SpTable from '../../components/Table/SpTable'
import { GET_ALL } from '../../graphQL/front/Querys/Materiales'
import { Button, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import AddBoxIcon from '@mui/icons-material/AddBox'
import SpAlert from '../../components/SpAlert'

export interface Material {
  id: string
  titulo: string
  categoria: string
  descripcion: string
  usuario: string
}
const Material = () => {
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
      <SpTable name={'Material'} rows={data ? data.obtenerTodosMateriales : []} onEditOronDelete={onEditOronDelete}>
        <DialogActions>
          <Button type='submit' variant='contained' color='success' endIcon={<AddBoxIcon />} onClick={() => router.push('/materiales/nuevo')}>
            Nuevo
          </Button>
        </DialogActions>
      </SpTable>
    </Layout>
  )
}

export default Material
