import React, { useCallback, useState } from 'react'
import SpLoading from '../../../components/SpLoading'
import Layout from '../../../layout/Layout'
import { useQuery } from '@apollo/client'
import SpTable from '../../../components/Table/SpTable'
import { GET_ALL } from '../../../graphQL/front/Querys/Usuarios'
import { InputRegister, UsuariosDataAll } from '../../../types/Usuario'
import { Button, DialogActions } from '@mui/material'
import { useRouter } from 'next/router'
import AddBoxIcon from '@mui/icons-material/AddBox'
import SpModalBasic from '../../../components/SpModalBasic'
import FormRegister from '../../../components/Forms/FormRegister'
import SpDialog from '../../../components/SpDialog'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Cursos = () => {
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
      <SpTable name={'Categoria materiales'} rows={data ? data.obtenerTodosUsuarios : []} onEditOronDelete={onEditOronDelete}>
        <DialogActions>
          <Button type='submit' variant='contained' color='success' endIcon={<AddBoxIcon />} onClick={() => {}}>
            Nuevo
          </Button>
          <Button type='submit' variant='contained' color='primary' endIcon={<VisibilityIcon />} onClick={() => {}}>
            detalle
          </Button>
        </DialogActions>
      </SpTable>
      <SpModalBasic open={openEdit} title={'Editar'}>
        <FormRegister onSubmit={onSubmit} titleBtn='Editar' />
      </SpModalBasic>
      <SpDialog open={openDelete} title={'Eliminar'} description={'¿Desea eliminar este registro?'} onCancel={() => setOpenDelete(false)} onSubmit={handleDelete} />
    </Layout>
  )
}

export default Cursos
