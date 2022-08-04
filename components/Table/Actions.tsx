import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const Actions = ({ onEditOronDelete, id }: { onEditOronDelete: (row: any, proceso: string) => void; id: string }) => {
  return (
    <Box display='flex' justifyContent='center' alignContent='center'>
      <IconButton aria-label='edit' size='large' onClick={() => onEditOronDelete(id, 'edit')}>
        <EditIcon fontSize='inherit' color='primary' />
      </IconButton>
      <IconButton aria-label='delete' size='large' onClick={() => onEditOronDelete(id, 'delete')}>
        <DeleteIcon fontSize='inherit' color='error' />
      </IconButton>
    </Box>
  )
}
export default Actions
