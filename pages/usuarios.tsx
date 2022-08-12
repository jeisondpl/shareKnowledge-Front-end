import React, { useCallback, useState } from 'react'
import Layout from '../layout/Layout'
import { useQuery } from '@apollo/client'
import SpTable from '../components/Table/SpTable'
import { GET_ALL } from '../graphQL/front/Querys/Usuarios'
import { InputRegister, UsuariosDataAll } from '../types/Usuario'
import { useRouter } from 'next/router'
import SpModalBasic from '../components/SpModalBasic'
import FormRegister from '../components/Forms/FormRegister'
import SpDialog from '../components/SpDialog'
import SpAlerta from '../components/SpAlert'

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
      <SpAlerta error={error && error.message} loading={loading} />
      <SpTable name={'Usuarios'} rows={data ? data.obtenerTodosUsuarios : []} onButtonNew={() => setOpenEdit(true)} onEditOronDelete={onEditOronDelete} />
      {/* create */}
      <SpModalBasic open={openEdit} title={'Crear usuario'} onClose={() => setOpenEdit(false)}>
        <FormRegister onSubmit={onSubmit} titleBtn='Crear' />
      </SpModalBasic>
      <SpDialog open={openDelete} title={'Eliminar'} description={'¿Desea eliminar este registro?'} onCancel={() => setOpenDelete(false)} onSubmit={handleDelete} />
    </Layout>
  )
}

export default Usuarios
