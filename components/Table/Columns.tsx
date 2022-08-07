import { columns } from '../Types/typeTable'

interface format {
  id: columns
  nombre: columns
  existencia: columns
  precio: columns
  descripcion: columns
  categoria: columns
  imagen: columns
  acciones: columns
  apellido: columns
  email: columns
  creado: columns
  rol: columns
  titulo: columns
}

export const dataColumns: format = {
  id: {
    field: 'Id',
    value: 'id',
  },
  nombre: {
    field: 'Nombre',
    value: 'nombre',
  },
  titulo: {
    field: 'Titulo',
    value: 'titulo',
  },
  existencia: {
    field: 'Existencia',
    value: 'existencia',
  },
  precio: {
    field: 'Precio',
    value: 'precio',
  },
  descripcion: {
    field: 'Descripcion',
    value: 'descripcion',
  },
  categoria: {
    field: 'Categoria',
    value: 'categoria',
  },
  imagen: {
    field: 'Imagen',
    value: 'imagen',
  },
  acciones: {
    field: 'Acciones',
    value: 'acciones',
  },
  apellido: {
    field: 'Apellido',
    value: 'apellido',
  },
  email: {
    field: 'Email',
    value: 'email',
  },
  creado: {
    field: 'Creado',
    value: 'creado',
  },
  rol: {
    field: 'Rol',
    value: 'rol',
  },
}
