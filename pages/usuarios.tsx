import Layout from '../layout/Layout'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL } from '../graphQL/front/Querys/Usuarios'
import { UsuariosDataAll } from '../types/Usuario'
import SpModalBasic from '../components/SpModalBasic'
import FormRegister from '../components/Forms/FormRegister'
import SpDialog from '../components/SpDialog'
import { SpAlert, SpTitle } from '../components'
import { ITableParams } from '../components/SPTable/Types/ITable'
import SpTableMaterial, { operaciones } from '../components/SPTable'
import useHandle from './commons/hooks/useHandle'
import { nameComponents } from '../types/Columns'

const name: nameComponents = 'Usuarios'

const Usuarios = () => {
  const get = useLazyQuery<UsuariosDataAll, { input: ITableParams }>(GET_ALL)
  const { state, loading, error, dispatch, handleDelete, onSubmit, fetchData, handleTable } = useHandle({ get, name })

  return (
    <Layout>
      <SpTitle title={'Usuarios'} variant='h4' />
      <SpAlert error={error?.message} loading={loading} />
      <SpTableMaterial name={name} fetchData={fetchData} handle={(row: any, op: operaciones) => handleTable(row, op)} />
      <SpModalBasic open={state.openModal} title={state.selectData ? 'Editar usuario' : 'Crear usuario'} onClose={() => dispatch({ type: 'openModal', payload: false })}>
        <FormRegister onSubmit={onSubmit} titleBtn={state.selectData ? 'Actualizar' : 'Crear'} selectData={state.selectData} />
      </SpModalBasic>
      <SpDialog
        open={state.openDelete}
        title={'Eliminar'}
        description={'¿Desea eliminar este registro?'}
        onCancel={() => dispatch({ type: 'openDelete', payload: false })}
        onSubmit={handleDelete}
      />
    </Layout>
  )
}

export default Usuarios
