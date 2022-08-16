import { gql } from 'apollo-server-micro'

// Schema 

// descripcion: String
// creado: String
// usuario: ID
// categoria: ID
export const schemaCursos = gql`

type Material {
  id: ID
  titulo: String

}

type Cursos {
  id: ID
  nombre: String
  categoria: ID
  material: [Material]
  descripcion: String
  usuario: ID
  creado: String
}


input MaterialInput {
  id: ID
}


input CursosInput {
  nombre: String!
  categoria: ID!
  material: [MaterialInput]
  descripcion: String
  usuario: ID!
  creado: String
}

type Query {
  #Cursoses
  obtenerCursos(id: ID!): Cursos
  obtenerTodosCursoses: [Cursos]

}

type Mutation {
  # Cursoses
  nuevoCursos(input: CursosInput): Cursos
}
`


