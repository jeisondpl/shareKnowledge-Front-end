import Material from '../../models/Material'
require('dotenv').config({ path: '.env' })


interface InputNuevoMaterial {
  input: {
    titulo: string
    descripcion: string
    url: string
    creado: string
    usuario: string
    categoria: string
  }
}

// Resolvers de Material
export const resolverMaterial = {
  Query: {
    obtenerMaterial: async (_: any, { id }: { id: string }) => {
      // revisar si el Material existe o no
      const material = await Material.findById(id)

      if (!material) {
        throw new Error('Material no encontrado')
      }

      return material
    },
    obtenerTodosMateriales: async (_: any, { }, ctx: any) => {
      try {
        if (ctx.usuario.rol === 'ADMINISTRADOR') {
          const material = await Material.find({})
          return material
        } else {
          const material = await Material.find({ usuario: ctx.usuario.id })
          return material
        }
      } catch (error) {
        throw new Error('Error el obtener los materiales ERROR:' + error)
      }
    },
    obtenerCursosEstudiantes: async (_: any, { }) => {
      try {
        const material = await Material.find({})
        return material
      } catch (error) {
        throw new Error('Error el obtener los materiales ERROR:' + error)
      }
    },
    obtenerCursosPorDocente: async (_: any, { }, ctx: any) => {
      try {
        if (ctx.usuario.rol === 'DOCENTE') {
          const material = await Material.find({ usuario: ctx.usuario.id })
          return material
        } else {
          throw new Error('No tiene el rol de docente')
        }
      } catch (error) {
        throw new Error('Error el obtener los materiales ERROR:' + error)
      }
    },
  },
  Mutation: {
    nuevoMaterial: async (_: any, { input }: InputNuevoMaterial, ctx: any) => {
      console.log("Jeison", ctx.usuario)




      const { titulo } = input
      // Revisar si ya esta registrado
      const existeUsuario = await Material.findOne({ titulo })
      if (existeUsuario) {
        throw new Error('El Material ya esta registrado')
      }

      try {
        // Guardarlo en la base de datos
        const material = new Material(input)
        material.save() // guardarlo
        return material
      } catch (error) {
        console.log(error)
      }
    },
  },


}


