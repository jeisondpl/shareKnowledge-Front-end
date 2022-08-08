import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query obtenerTodosMateriales {
    obtenerTodosMateriales {
      id
      titulo
      categoria
      descripcion
      usuario
    } 
  }
`


export const GET_ALL_DOCENTE = gql`
query ObtenerCursosPorDocente {
  obtenerCursosPorDocente {
    id
    titulo
    descripcion
    creado
    usuario
    categoria
  }
}
`


