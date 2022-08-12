import { useQuery } from '@apollo/client'
import { GET_ALL } from '../graphQL/front/Querys/CatMateriales'
import { CatMateriales } from '../types/Categorias'

const useMateriales = () => {
  return useQuery<{ obtenerTodosCategoriaMaterial: CatMateriales[] }, CatMateriales>(GET_ALL)
}

export default useMateriales
