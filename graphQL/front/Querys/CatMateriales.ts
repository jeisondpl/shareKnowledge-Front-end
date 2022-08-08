import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query obtenerTodosCategoriaMaterial {
    obtenerTodosCategoriaMaterial {
        id
        nombre
        descripcion
        creado
      }
  }
`
