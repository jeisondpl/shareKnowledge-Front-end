import * as Yup from 'yup'
import { InputLogin, InputRegister } from '../../types/Usuario'


//login
const loginSchema = {
    email: Yup.string().email('El email no es valido').required('Campo email requerido'),
    password: Yup.string().required('Campo contraseña requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
}
export const SchemaLogin = Yup.object().shape(loginSchema)

export const InitialValueLogin: InputLogin = {
    email: '',
    password: '',
}



//Register
export const SchemaRegister = Yup.object().shape(Object.assign(
    loginSchema,
    {
        nombre: Yup.string().required('Campo nombre requerido'),
        apellido: Yup.string().required('Campo apellido requerido'),
    }
))

export const InitialValueRegister: InputRegister = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',

}

