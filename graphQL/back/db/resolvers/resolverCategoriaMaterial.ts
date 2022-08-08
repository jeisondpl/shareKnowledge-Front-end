import CategoriaMaterial from '../../models/CategoriaMaterial'
require('dotenv').config({ path: '.env' })


interface InputNuevoCategoriaMaterial {
  input: {
    nombre: string
    descripcion: string
    creado: string
  }
}

// Resolvers de CategoriaMaterial
export const resolverCategoriaMaterial = {
  Query: {
    obtenerCategoriaMaterial: async (_: any, { id }: { id: string }) => {
      // revisar si el CategoriaMaterial existe o no
      const material = await CategoriaMaterial.findById(id)

      if (!material) {
        throw new Error('CategoriaMaterial no encontrado')
      }

      return material
    },
    obtenerTodosCategoriaMaterial: async (_: any, { }, ctx: any) => {
      console.log(ctx.usuario.rol)
      try {
        if (ctx.usuario.rol === 'ADMINISTRADOR') {
          const material = await CategoriaMaterial.find({})
          return material
        } else {
          throw new Error('Rol no es administrador')
        }
      } catch (error) {
        throw new Error('Error el obtener las categoorias de materiales ERROR:' + error)
      }
    },
  },
  Mutation: {
    nuevoCategoriaMaterial: async (_: any, { input }: InputNuevoCategoriaMaterial) => {
      const { nombre } = input
      // Revisar si ya esta registrado
      const existeUsuario = await CategoriaMaterial.findOne({ nombre })
      if (existeUsuario) {
        throw new Error('El CategoriaMaterial ya esta registrado')
      }

      try {
        // Guardarlo en la base de datos
        const material = new CategoriaMaterial(input)
        material.save() // guardarlo
        return material
      } catch (error) {
        console.log(error)
      }
    },
  },


}


