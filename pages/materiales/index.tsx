import React, { useCallback, useState } from 'react'
import Layout from '../../layout/Layout'
import SpTable from '../../components/Table/SpTable'
import { useRouter } from 'next/router'
import SpAlert from '../../components/SpAlert'
import SpModalBasic from '../../components/SpModalBasic'
import { FormLoadMaterial } from '../../components'
import { useMateriales } from '../../hooks'

const Material = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data, loading, error } = useMateriales()

  const onEditOronDelete = useCallback((rowData: any, proceso: string) => {
    if (proceso === 'edit') {
      console.log('edit', rowData, proceso)
    }
    if (proceso === 'delete') {
      console.log('delete', rowData, proceso)
    }
  }, [])

  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
    router.push('/materiales')
  }, [])

  return (
    <Layout>
      <SpAlert error={error?.message} loading={loading} />
      <SpTable name={'Materiales'} rows={data ? data.obtenerTodosMateriales : []} onButtonNew={() => setOpen(true)} onEditOronDelete={onEditOronDelete} />

      {/* create */}
      <SpModalBasic open={open} title={'Crear material'} onClose={() => setOpen(false)}>
        <FormLoadMaterial onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'} type={'material'} />
      </SpModalBasic>
    </Layout>
  )
}

export default Material
