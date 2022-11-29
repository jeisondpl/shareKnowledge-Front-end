import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { nameComponents } from '../../../types/Columns'

interface IColumns {
  name: nameComponents
}

const COLUMNS = {
  Materiales: () => [
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
  ],
  CatMateriales: () => [
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
  ],
  Usuarios: () => [
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
  ],
}

const useColumns = ({ name }: IColumns) => {
  const columns = COLUMNS[name] || (() => [])
  return useMemo<MRT_ColumnDef<any>[]>(columns, [columns])
}

export default useColumns
