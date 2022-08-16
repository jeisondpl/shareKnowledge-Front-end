import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query obtenerTodosCategoria {
    obtenerTodosCategoria {
      id
      nombre
      descripcion
		  creado   
      }
  }
`
