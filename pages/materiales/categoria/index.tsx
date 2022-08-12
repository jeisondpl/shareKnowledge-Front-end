import React, { useCallback, useState } from 'react'
import SpLoading from '../../../components/SpLoading'
import Layout from '../../../layout/Layout'
import SpTable from '../../../components/Table/SpTable'
import { useRouter } from 'next/router'
import SpModalBasic from '../../../components/SpModalBasic'
import { FormLoadMaterial } from '../../../components'
import { useCatMateriales } from '../../../hooks'

const Cursos = () => {
  const router = useRouter()
  const { data, loading, error } = useCatMateriales()

  const [openEdit, setOpenEdit] = useState(false)
  const [usuario, setUsuario] = useState<string>()
  const [openNew, setOpenNew] = useState(false)

  const onEditOronDelete = useCallback(
    (rowData: any, proceso: string) => {
      if (proceso === 'edit') {
        setOpenEdit(true)
      }
      if (proceso === 'delete') {
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
    setOpenNew(false)
  }, [])

  return (
    <Layout>
      <SpLoading loading={loading} />
      <>{error && <p>Error: {error.message}</p>}</>
      <SpTable name={'Categorias'} rows={data ? data.obtenerTodosCategoriaMaterial : []} onEditOronDelete={onEditOronDelete} onButtonNew={() => setOpenNew(true)} />
      {/* create  and edit*/}
      <SpModalBasic
        open={openNew || openEdit}
        title={'Crear categoria'}
        onClose={() => {
          setOpenNew(false)
          setOpenEdit(false)
        }}
      >
        <FormLoadMaterial onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'} type={'categoria'} />
      </SpModalBasic>
    </Layout>
  )
}

export default Cursos
