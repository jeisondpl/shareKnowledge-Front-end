import { useQuery } from '@apollo/client'
import { GET_ALL } from '../graphQL/front/Querys/Materiales'
import { Material } from '../types/Materiales'

const useMateriales = () => {
  return useQuery<{ obtenerTodosMateriales: Material[] }, Material>(GET_ALL)
}

export default useMateriales
