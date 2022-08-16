import { proccessTable } from '../../Types/typeTable'
import { dataColumns as Dc } from '../Columns'

const useHeaderTable = (name: proccessTable) => {
  switch (name) {
    case 'Materiales':
      return [Dc.titulo, Dc.categoria, Dc.descripcion, Dc.acciones]
    case 'Usuarios':
      return [Dc.nombre, Dc.apellido, Dc.email, Dc.rol, Dc.acciones]
    case 'Categorias':
      return [Dc.nombre, Dc.descripcion, Dc.creado, Dc.acciones]
    case 'Cursos':
      return [Dc.titulo, Dc.categoria, Dc.usuario, Dc.descripcion, Dc.acciones]
    default:
      return []
  }
}

export default useHeaderTable
