import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { nameComponents } from '../../../types/Columns'

interface IColumns {
  name: nameComponents
}

const useColumns = ({ name }: IColumns) => {
  let column

  switch (name) {
    case 'Materiales':
      column = () => [
        {
          header: 'Nombre',
          accessorKey: 'nombre',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
        {
          header: 'categoria',
          accessorKey: 'categoria',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
        {
          header: 'Descripcion',
          accessorKey: 'descripcion',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
        {
          header: 'usuario',
          accessorKey: 'usuario',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
      ]
      break

    case 'CatMateriales':
      column = () => [
        {
          header: 'Nombre',
          accessorKey: 'nombre',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
        {
          header: 'Descripcion',
          accessorKey: 'descripcion',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
      ]
      break

    case 'Usuarios':
      column = () => [
        {
          accessorKey: 'nombre',
          header: 'Nombre',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
        {
          accessorKey: 'apellido',
          header: 'Apellido',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
        {
          accessorKey: 'email',
          header: 'Correo',
          muiTableHeadCellProps: { sx: { color: '#7AC4B3' } },
        },
      ]
      break

    default:
      column = () => []
      break
  }

  return useMemo<MRT_ColumnDef<any>[]>(column, [column])
}

export default useColumns
