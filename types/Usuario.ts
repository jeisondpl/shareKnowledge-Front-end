
import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'

export type rol =
    'VERIFICACION' |
    'ESTUDIANTE' |
    'DOCENTE' |
    'ADMINISTRADOR' | null;


export interface IUsuario {
    id?: string
    nombre: string
    apellido: string
    email: string
    password?: string
    rol?: rol
    creado?: any

}

export interface InputRegister extends IUsuario {
    limit: number,
    offset: number,
    sort: string,
    filter: string,
    globalFilter: string,
}

export interface InputLogin {
    email: string
    password: string
}

export interface ResponseLogin {
    autenticarUsuario: {
        token: string
        user: InputRegister
        permissions: string[]
    }
}

export interface UsuariosDataAll {
    obtenerTodosUsuarios: InputRegister[]
}

export interface UsuariosDataFindById {
    obtenerUsuario: InputRegister
}