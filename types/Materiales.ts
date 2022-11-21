import { IPaginate } from "./Paginate"

export interface Material {
    id: string
    titulo: string
    categoria?: string
    descripcion?: string
    usuario: string
}

export interface Response extends IPaginate {
    docs: Material[]
}

export interface MaterialesDataAll {
    obtenerTodosMateriales: Response
}