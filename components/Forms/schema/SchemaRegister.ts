import * as Yup from 'yup'
import { InputRegister } from '../../../types/Usuario'
import { loginSchema } from './SchemaLogin'

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

