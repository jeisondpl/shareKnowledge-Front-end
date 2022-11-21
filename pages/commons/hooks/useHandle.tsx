import { LazyQueryResultTuple } from '@apollo/client'
import { useReducer, useCallback } from 'react'
import { operaciones } from '../../../components/SPTable'
import { ITableParams } from '../../../components/SPTable/Types/ITable'
import { nameComponents } from '../../../types/Columns'

const initialStates = {
  openModal: false,
  openDelete: false,
  selectData: null,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'openModal':
      return { ...state, openModal: action.payload }
    case 'openDelete':
      return { ...state, openDelete: action.payload }
    case 'selectData':
      return { ...state, selectData: action.payload }
    default:
      return state
  }
}

const modulos = {
  CatMateriales: (data: any) => data?.obtenerTodosCategoria,
  Materiales: (data: any) => data?.obtenerTodosMateriales,
  Usuarios: (data: any) => data?.obtenerTodosUsuarios,
}

interface Props {
  get: LazyQueryResultTuple<any, { input: ITableParams }>
  name: nameComponents
}

const useHandle = ({ get, name }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialStates)
  const [gethandle, { loading, error }] = get

  const fetchData = useCallback(
    async (values: ITableParams) => {
      const { data } = await gethandle({
        variables: {
          input: values,
        },
      })
      return modulos[name](data)
    },
    [gethandle, name]
  )

  const handleDelete = () => {
    dispatch({ type: 'openDelete', payload: false })
    dispatch({ type: 'selectData', payload: null })
  }

  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
  }, [])

  const handleTable = useCallback(
    (row: any, op: operaciones) => {
      if (op === 'delete') {
        dispatch({ type: 'openDelete', payload: true })
        dispatch({ type: 'selectData', payload: row })
      }
      if (op === 'edit') {
        dispatch({ type: 'selectData', payload: row })
        dispatch({ type: 'openModal', payload: true })
      }
      if (op === 'create') {
        dispatch({ type: 'openModal', payload: true })
      }
    },
    [dispatch]
  )

  return {
    state,
    loading,
    error,
    dispatch,
    fetchData,
    handleDelete,
    onSubmit,
    handleTable,
  }
}

export default useHandle
