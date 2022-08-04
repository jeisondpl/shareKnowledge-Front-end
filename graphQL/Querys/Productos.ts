import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`