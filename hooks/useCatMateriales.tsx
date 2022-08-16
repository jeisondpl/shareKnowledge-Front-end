import { useQuery } from '@apollo/client'
import { GET_ALL } from '../graphQL/front/Querys/CatMateriales'
import { CatMateriales } from '../types/Categorias'

const useMateriales = () => {
  const { data, loading, error } = useQuery<{ obtenerTodosCategoria: CatMateriales[] }, CatMateriales>(GET_ALL)
  return { data: data ? data.obtenerTodosCategoria : [], loading, error }
}

export default useMateriales
