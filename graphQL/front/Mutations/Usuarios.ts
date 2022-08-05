import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
      rol
    }
  }
`


export const LOGIN_USER = gql`
  mutation autenticarUsuario($input:AutenticarInput){
    autenticarUsuario(input:$input) {
      token
      user{
        id
        nombre
        apellido
        email
        creado
        rol
      }
    }
  }
`