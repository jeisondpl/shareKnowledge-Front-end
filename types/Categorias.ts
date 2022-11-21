 import { IPaginate } from "./Paginate"

export interface CatMateriales {
  id: string
  nombre: string
  descripcion: string
  creado: string
}

export interface Response extends IPaginate {
    docs: CatMateriales[]
}

export interface CatMaterialesDataAll {
  obtenerTodosCategoria: Response
}