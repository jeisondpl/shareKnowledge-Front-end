import { proccessTable } from '../../Types/typeTable'
import { dataColumns as Dc } from '../Columns'

const useHeaderTable = (name: proccessTable) => {
  let header: any[] = []

  switch (name) {
    case 'Productos':
      header = [Dc.nombre, Dc.precio, Dc.existencia, Dc.creado, Dc.acciones]
      break
    case 'Usuarios':
      header = [Dc.nombre, Dc.apellido, Dc.email, Dc.rol, Dc.acciones]
      break
    default:
      // header = columns
      break
  }

  return {
    header,
  }
}

export default useHeaderTable
