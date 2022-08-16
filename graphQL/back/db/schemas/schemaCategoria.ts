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

  type Query {
    obtenerCategoria(id: ID!): Categoria
    obtenerTodosCategoria: [Categoria]
  }

  type Mutation {
    nuevoCategoria(input: CategoriaInput): Categoria
  }
`


