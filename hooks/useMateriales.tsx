import { useQuery } from '@apollo/client'
import { GET_ALL } from '../graphQL/front/Querys/Materiales'
import { Material } from '../types/Materiales'

const useMateriales = () => {
  const { data, loading, error } = useQuery<{ obtenerTodosMateriales: Material[] }, Material>(GET_ALL)
  return {
    dataMateriales: data?.obtenerTodosMateriales,
    loading,
    error,
  }
}
export default useMateriales
