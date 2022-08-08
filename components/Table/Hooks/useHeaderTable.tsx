import { proccessTable } from '../../Types/typeTable'
import { dataColumns as Dc } from '../Columns'

const useHeaderTable = (name: proccessTable) => {
  switch (name) {
    case 'Materiales':
      return [Dc.titulo, Dc.categoria, Dc.descripcion, Dc.acciones]
    case 'Usuarios':
      return [Dc.nombre, Dc.apellido, Dc.email, Dc.rol, Dc.acciones]
    default:
      return []
  }
}

export default useHeaderTable
