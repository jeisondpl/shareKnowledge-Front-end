require('dotenv').config({ path: '.env' })
import Cursos from '../../models/Cursos'
import { ICursos } from '../../types/cursos'


interface InputCursos {
  input: ICursos
}

// Resolvers de Cursos
export const resolverCursos = {
  Query: {
    obtenerCursos: async (_: any, { id }: { id: string }) => {
      // revisar si el Cursos existe o no
      const curso: ICursos = await Cursos.findById(id)

      if (!curso) {
        throw new Error('Cursos no encontrado')
      }
      return curso
    },
    obtenerTodosCursoses: async (_: any, { }, ctx: any) => {
      try {
        if (ctx.usuario.rol === 'ADMINISTRADOR') {
          const cursos: ICursos = await Cursos.find({})
          return cursos
        } else {
          const cursos: ICursos = await Cursos.find({ usuario: ctx.usuario.id })
          return cursos
        }
      } catch (error) {
        throw new Error('Error el obtener los Cursoses ERROR:' + error)
      }
    },
    obtenerCursosEstudiantes: async (_: any, { }) => {
      try {
        const cursos: ICursos = await Cursos.find({})
        return cursos
      } catch (error) {
        throw new Error('Error el obtener los Cursoses ERROR:' + error)
      }
    },
    obtenerCursosPorDocente: async (_: any, { }, ctx: any) => {
      try {
        if (ctx.usuario.rol === 'DOCENTE') {
          const cursos: ICursos = await Cursos.find({ usuario: ctx.usuario.id })
          return cursos
        } else {
          throw new Error('No tiene el rol de docente')
        }
      } catch (error) {
        throw new Error('Error el obtener los Cursoses ERROR:' + error)
      }
    },
  },
  Mutation: {

    nuevoCursos: async (_: any, { input }: InputCursos, ctx: any) => {
      const { nombre } = input
      // Revisar si ya esta registrado
      const existeUsuario: ICursos = await Cursos.findOne({ nombre })
      // if (existeUsuario) {
      //   throw new Error('El Cursos ya esta registrado')
      // }









      try {
        // Guardarlo en la base de datos
        const curso = new Cursos({
          ...input,
          usuario: ctx.usuario.id,
        })
        curso.save() // guardarlo
        return curso
      } catch (error) {
        console.log(error)
      }
    },
  },


}


