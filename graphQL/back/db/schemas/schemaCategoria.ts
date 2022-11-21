import { gql } from 'apollo-server-micro'

// Schema
export const schemasCategoria = gql`
  type Categoria {
    id: ID
    nombre: String
    descripcion: String
    creado: String
  }

  input CategoriaInput {
    nombre: String!
    descripcion: String
    creado: String
  }


  type paguinateCategorias {
    docs: [Categoria]
    totalDocs: String,
    limit: String,
    totalPages: String,
    page: String,
    pagingCounter: String,
    hasPrevPage: Boolean,
    hasNextPage: Boolean,
    prevPage: String,
    nextPage: String
  }

  input PaguinateInputCategoriaMateriales {
    pageIndex: Int
    pageSize: Int
    globalFilter: String
  }

  type Query {
    obtenerCategoria(id: ID!): Categoria
    obtenerTodosCategoria(input: PaguinateInputCategoriaMateriales): paguinateCategorias
  }

  type Mutation {
    nuevoCategoria(input: CategoriaInput): Categoria
  }
`


