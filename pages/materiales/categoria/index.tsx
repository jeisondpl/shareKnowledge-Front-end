import Layout from '../../../layout/Layout'
import { operaciones } from '../../../components/SPTable'
import { SpDialog, SpTableMaterial, SpModalBasic, SpAlert, FormLoadMaterial, SpTitle } from '../../../components'
import useHandle from '../../commons/hooks/useHandle'
import { GET_ALL } from '../../../graphQL/front/Querys/CatMateriales'
import { ITableParams } from '../../../components/SPTable/Types/ITable'
import { CatMaterialesDataAll } from '../../../types/Categorias'
import { useLazyQuery } from '@apollo/client'
import { nameComponents } from '../../../types/Columns'

const name: nameComponents = 'Categorias de materiales'

const Categoria = () => {
  const get = useLazyQuery<CatMaterialesDataAll, { input: ITableParams }>(GET_ALL)
  const { state, loading, error, dispatch, handleDelete, onSubmit, fetchData, handleTable } = useHandle({ get, name })

  return (
    <Layout>
      <SpTitle title={name} variant='h4' margin={'0px 0px 20px 0px'} />
      <SpAlert error={error?.message} loading={loading} />
      <SpTableMaterial name={name} fetchData={fetchData} handle={(row: any, op: operaciones) => handleTable(row, op)} />
      <SpModalBasic open={state.openModal} title={'Crear categoria'} onClose={() => dispatch({ type: 'openModal', payload: false })}>
        <FormLoadMaterial onSubmit={onSubmit} onCancel={() => {}} titleBtn={'Guardar'} type={'categoria'} />
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

export default Categoria
