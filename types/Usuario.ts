export type rol =
    'VERIFICACION' |
    'ESTUDIANTE' |
    'DOCENTE' |
    'ADMINISTRADOR' | null;

export interface InputRegister {
    id?: string
    nombre: string
    apellido: string
    email: string
    password?: string
    rol?: rol

}

export interface InputLogin {
    email: string
    password: string
}

export interface ResponseLogin {
    autenticarUsuario: {
        token: string
        user: InputRegister
    }
}


export interface UsuariosDataAll {
    obtenerTodosUsuarios: InputRegister[]
}

export interface UsuariosDataFindById {
    obtenerUsuario: InputRegister
}