import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'
import { dev } from '../utils/oops'

const Actions = ({ onEditOronDelete, id }: { onEditOronDelete: (row: any, proceso: string) => void; id: string }) => {
  const confirmar = () => {
    Swal.fire({
      title: '¿Eliminar este registro?',
      text: 'Se eliminara el registro de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'Simulación de eliminar registro ok', 'success')
      }
    })
  }

  return (
    <Box display='flex' justifyContent='center' alignContent='center'>
      {/* <IconButton aria-label='edit' size='large' onClick={() => onEditOronDelete(id, 'edit') }> */}
      <IconButton aria-label='edit' size='large' onClick={() => dev()}>
        <EditIcon fontSize='inherit' color='primary' />
      </IconButton>
      <IconButton aria-label='delete' size='large' onClick={() => confirmar()}>
        <DeleteIcon fontSize='inherit' color='error' />
      </IconButton>
    </Box>
  )
}
export default Actions
