import Categoria from '../../models/Categoria'
require('dotenv').config({ path: '.env' })


interface InputNuevoCategoria {
  input: {
    nombre: string
    descripcion: string
    creado: string
  }
}

// Resolvers de Categoria
export const resolverCategoria = {
  Query: {
    obtenerCategoria: async (_: any, { id }: { id: string }) => {
      // revisar si el Categoria existe o no
      const categoria = await Categoria.findById(id)

      if (!categoria) {
        throw new Error('Categoria no encontrado')
      }

      return categoria
    },
    obtenerTodosCategoria: async (_: any, { }, ctx: any) => {
      console.log(ctx.usuario.rol)
      try {
        if (ctx.usuario.rol === 'ADMINISTRADOR') {
          const categoria = await Categoria.find({})
          return categoria
        } else {
          throw new Error('Rol no es administrador')
        }
      } catch (error) {
        throw new Error('Error el obtener las categoorias ERROR:' + error)
      }
    },
  },
  Mutation: {
    nuevoCategoria: async (_: any, { input }: InputNuevoCategoria) => {
      const { nombre } = input
      // Revisar si ya esta registrado
      const existeUsuario = await Categoria.findOne({ nombre })
      if (existeUsuario) {
        throw new Error('El Categoria ya esta registrado')
      }

      try {
        // Guardarlo en la base de datos
        const categoria = new Categoria(input)
        categoria.save() // guardarlo
        return categoria
      } catch (error) {
        console.log(error)
      }
    },
  },


}


