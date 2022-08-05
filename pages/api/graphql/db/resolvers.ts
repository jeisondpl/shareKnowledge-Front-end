
const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })


interface usuario {
  id: string, email: string, nombre: string, apellido: string, rol: string
}

interface PropTokens {
  usuario: usuario
  secreta: string
  expiresIn: string
}

interface InputNuevoUsuario {
  input: {
    email: string,
    password: string,
  }
}


const crearToken = ({ usuario, secreta, expiresIn }: PropTokens) => {
  const { id, email, nombre, apellido, rol } = usuario
  return jwt.sign({ id, email, nombre, apellido, rol }, secreta, { expiresIn })
}




// Resolvers
export const resolvers = {
  Query: {
    obtenerUsuario: async (_: any, { }, ctx: any) => {
      return ctx.usuario
    },
    obtenerTodosUsuarios: async (_: any, { }, ctx: any) => {
      console.log(ctx.usuario.rol)

      if (ctx.usuario.rol !== 'ADMINISTRADOR') {
        throw new Error('No tiene el rol de Administrador')
      }
      try {
        const usuario = await Usuario.find({})
        return usuario
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    nuevoUsuario: async (_: any, { input }: InputNuevoUsuario) => {
      const { email, password } = input
      // Revisar si el usuario ya esta registrado
      const existeUsuario = await Usuario.findOne({ email })
      if (existeUsuario) {
        throw new Error('El usuario ya esta registrado')
      }

      // Hashear su password
      const salt = await bcryptjs.genSalt(10)
      input.password = await bcryptjs.hash(password, salt)

      try {
        // Guardarlo en la base de datos
        const usuario = new Usuario(input)
        usuario.save() // guardarlo
        return usuario
      } catch (error) {
        console.log(error)
      }
    },
    autenticarUsuario: async (_: any, { input }: InputNuevoUsuario) => {
      const { email, password } = input

      // Si el usuario existe
      const existeUsuario = await Usuario.findOne({ email })

      if (!existeUsuario) {
        throw new Error('El usuario no existe')
      }

      // Revisar si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password)
      if (!passwordCorrecto) {
        throw new Error('El Password es Incorrecto')
      }

      // Crear el token
      return {
        token: crearToken({
          usuario: existeUsuario,
          secreta: process.env.SECRETA || '',
          expiresIn: '8h'
        }),
        user: existeUsuario,
      }
    },
    actualizarUsuario: async (_: any, { id, input }: { id: string, input: string }, ctx: any) => {
      // Verificar si existe o no
      let usuario = await Usuario.findById(id)

      if (!usuario) {
        throw new Error('Ese usuario no existe')
      }

      // Verificar si el usuario admin esta autenticado
      if (ctx.usuario.rol !== 'ADMINISTRADOR') {
        throw new Error('No tienes las credenciales')
      }

      // guardar el usuario
      usuario = await Usuario.findOneAndUpdate({ _id: id }, input, { new: true })
      return usuario
    },
  },
}

