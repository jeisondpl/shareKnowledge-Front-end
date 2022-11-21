import { gql } from 'apollo-server-micro'

// Schema
export const schemaMaterial = gql`

type Material {
  id: ID
  nombre: String
  url: String
  descripcion: String
  creado: String
  usuario: ID
  categoria: ID
}


input MaterialInput {
  nombre: String!
  descripcion: String
  url: String
  creado: String
  usuario: String
  categoria: String
}

type paguinateMateriales {
  docs: [Material]
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

input PaguinateInputMateriales {
  pageIndex: Int
  pageSize: Int
  globalFilter: String
}

type Query {
  #Materiales
  obtenerMaterial(id: ID!): Material
  obtenerTodosMateriales(input: PaguinateInputMateriales): paguinateMateriales
  obtenerCursosEstudiantes: [Material]
  obtenerCursosPorDocente: [Material]

}

type Mutation {
  # Materiales
  nuevoMaterial(input: MaterialInput): Material
}
`


