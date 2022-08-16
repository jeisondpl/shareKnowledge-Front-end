import { IMaterial } from "./material"

export interface ICursos {
    id: string
    nombre: string
    categoria: string
    material: IMaterial[]
    descripcion: string
    usuario: string
    creado: string
}