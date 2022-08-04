import React, { useCallback, useState } from 'react'
import SpLoading from '../components/SpLoading'
import Layout from '../layout/Layout'
import { useQuery } from '@apollo/client'
import SpTable from '../components/Table/SpTable'
import { GET_ALL } from '../graphQL/Querys/Usuarios'
import { InputRegister, UsuariosDataAll } from '../types/Usuario'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import AddBoxIcon from '@mui/icons-material/AddBox'
import SpModalBasic from '../components/SpModalBasic'
import FormRegister from '../components/FormsLogin/FormRegister'
import SpDialog from '../components/SpDialog'

const Usuarios = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<UsuariosDataAll, InputRegister>(GET_ALL)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [usuario, setUsuario] = useState<string>()

  const onEditOronDelete = useCallback(
    (rowData: any, proceso: string) => {
      if (proceso === 'edit') {
        setOpenEdit(true)
      }
      if (proceso === 'delete') {
        setOpenDelete(true)
      }
      setUsuario(rowData)
    },
    [router]
  )

  const onSubmit = useCallback((rowData: any) => {
    console.log('id old: ', usuario)
    console.log('new data: ', rowData)
    setOpenEdit(false)
    setUsuario(undefined)
  }, [])

  const handleDelete = () => {
    console.log('ejecutar delete :', usuario)
    setOpenDelete(false)
    setUsuario(undefined)
  }

  return (
    <Layout>
      <SpLoading loading={loading} />
      <>{error && <p>Error: {error.message}</p>}</>

      <SpTable name={'Usuarios'} rows={data ? data.obtenerTodosUsuarios : []} onEditOronDelete={onEditOronDelete}>
        <IconButton aria-label='delete' size='large' onClick={() => router.push('/')}>
          <AddBoxIcon fontSize='inherit' color='success' />
        </IconButton>
      </SpTable>

      <SpModalBasic open={openEdit} title={'Editar'}>
        <FormRegister onSubmit={onSubmit} />
      </SpModalBasic>

      <SpDialog open={openDelete} title={'Eliminar'} description={'¿Desea eliminar este registro?'} onCancel={() => setOpenDelete(false)} onSubmit={handleDelete} />
    </Layout>
  )
}

export default Usuarios
