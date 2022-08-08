import { gql } from 'apollo-server-micro'

// Schema
export const schemaUsuarios = gql`
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

type Query {
  #Usuarios
  obtenerUsuario: Usuario
  obtenerTodosUsuarios: [Usuario]
  obtenerTodosDocentes: [Usuario]
}

type Mutation {
  # Usuarios
  nuevoUsuario(input: UsuarioInput): Usuario
  autenticarUsuario(input: AutenticarInput): Token
  actualizarUsuario(id: ID!, input: UsuarioInput): Usuario
  
}
`


