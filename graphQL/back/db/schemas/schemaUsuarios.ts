import { gql } from 'apollo-server-micro'

// Schema
export const schemaUsuarios = gql`

enum Componentes {
  CURSOS
  MATERIALES
  USUARIOS
}

type Usuario {
  id: ID
  nombre: String
  apellido: String
  email: String
  creado: String
  rol: Rol
}

type Token {
  token: String
  user: Usuario
  permissions: [Componentes]
}

input UsuarioInput {
  nombre: String!
  apellido: String!
  email: String!
  password: String!
  rol: String!
}

input AutenticarInput {
  email: String!
  password: String!
}
enum Rol {
  VERIFICACION
  ESTUDIANTE
  DOCENTE
  ADMINISTRADOR
}

type paguinateUsuarios{
  docs: [Usuario]
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

input PaguinateInput {
  pageIndex: Int
  pageSize: Int
  globalFilter: String
}

type Query {
  #Usuarios
  obtenerUsuario: Usuario
  obtenerTodosUsuarios(input: PaguinateInput): paguinateUsuarios
  obtenerTodosDocentes: [Usuario]
}

type Mutation {
  # Usuarios
  nuevoUsuario(input: UsuarioInput): Usuario
  autenticarUsuario(input: AutenticarInput): Token
  actualizarUsuario(id: ID!, input: UsuarioInput): Usuario
  
}
`



