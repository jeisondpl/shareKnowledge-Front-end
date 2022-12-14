import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query obtenerTodosCategoria ($input: PaguinateInputCategoriaMateriales) {
    obtenerTodosCategoria (input: $input){
      docs {   
        id
        nombre
        descripcion
        creado 
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

export const GET_ALL_SELET = gql`
query obtenerTodosCatSelect{
    obtenerTodosCatSelect{
      id
      nombre
      descripcion
    }
  }
`


