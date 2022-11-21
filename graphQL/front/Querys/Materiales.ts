import { gql } from "@apollo/client";

export const GET_ALL = gql`
query obtenerTodosMateriales ($input: PaguinateInputMateriales){
  obtenerTodosMateriales (input: $input){
      docs {   
        id
        nombre
        descripcion
        url
        categoria
        usuario
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


export const GET_ALL_DOCENTE = gql`
query ObtenerCursosPorDocente {
  obtenerCursosPorDocente {
    id
    nombre
    descripcion
    creado
    usuario
    categoria
  }
}
`


