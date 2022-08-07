import { gql } from 'apollo-server-micro'

// Schema
export const schemasCategoriaMaterial = gql`
  type CategoriaMaterial {
    id: ID
    nombre: String
    descripcion: String
    creado: String
  }

  input CategoriaMaterialInput {
    nombre: String!
    descripcion: String
    creado: String
  }

  type Query {
    obtenerCategoriaMaterial(id: ID!): CategoriaMaterial
    obtenerTodosCategoriaMaterial: [CategoriaMaterial]
  }

  type Mutation {
    nuevoCategoriaMaterial(input: CategoriaMaterialInput): CategoriaMaterial
  }
`


