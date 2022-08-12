import React, { useCallback } from 'react'
import Layout from '../../layout/Layout'
import FormCursos from '../../components/Forms/FormCursos'
import { useRouter } from 'next/router'

const NuevoCurso = () => {
  const router = useRouter()

  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
    router.push('/cursos/list')
  }, [])

  return (
    <Layout>
      <FormCursos onSubmit={onSubmit} titleBtn={'Guardar'} onCancel={() => router.push('/cursos/list')} />
    </Layout>
  )
}
export default NuevoCurso
