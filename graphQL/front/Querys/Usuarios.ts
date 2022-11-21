import { gql } from "@apollo/client";

export const GET_ALL = gql`
query obtenerTodosUsuarios($input: PaguinateInput)  {
  obtenerTodosUsuarios(input: $input)  {
      docs {  
        id
        nombre
        apellido
        email
        creado
        rol
      }
      totalDocs
      limit
      totalPages
      page
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
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

export const GET_ALL_DOCENTE = gql`
  query obtenerTodosDocentes {
    obtenerTodosDocentes {
      id
      nombre
      apellido
      email
      creado
      rol
    }
  }
`
