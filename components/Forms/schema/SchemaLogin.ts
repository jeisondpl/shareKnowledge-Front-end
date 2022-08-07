import * as Yup from 'yup'
import { InputLogin } from '../../../types/Usuario'

//login
export const loginSchema = {
    email: Yup.string().email('El email no es valido').required('Campo email requerido'),
    password: Yup.string().required('Campo contraseña requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
}
export const SchemaLogin = Yup.object().shape(loginSchema)

export const InitialValueLogin: InputLogin = {
    email: '',
    password: '',
}


