import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query obtenerTodosUsuarios {
    obtenerTodosUsuarios {
        id
        nombre
        apellido
        email
        creado
        rol
    }
  }
`


export const GET_FIND_BY_ID = gql`
query obtenerUsuario {
  obtenerUsuario {
      id
      nombre
      apellido
      email
      creado
      rol
  }
}
`


