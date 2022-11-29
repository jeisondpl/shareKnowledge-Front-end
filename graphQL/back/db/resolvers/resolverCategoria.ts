import Categoria from '../../models/Categoria'
import { InputUserPaginate } from '../../types/paginate'
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
    obtenerTodosCategoria: async (_: any, { input }: InputUserPaginate) => {
      try {
        const { pageIndex, pageSize, globalFilter } = input
        const Categorias: any = await Categoria.paginate({
          $or: [
            { titulo: { $regex: globalFilter, $options: 'i' } },
            { descripcion: { $regex: globalFilter, $options: 'i' } },
            { url: { $regex: globalFilter, $options: 'i' } },
          ]
        },
          { limit: pageSize, page: pageIndex })
        console.log("=>=>Categoria=>=>", Categorias)
        return Categorias

      } catch (error) {
        throw new Error('Error el obtener los materiales ERROR:' + error)
      }
    },
    obtenerTodosCatSelect: async (_: any, { }, ctx: any) => {
      try {
        const Categorias: any = await Categoria.find({})
        return Categorias
      } catch (error) {
        throw new Error('Error el obtener los Categorias ERROR:' + error)
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


