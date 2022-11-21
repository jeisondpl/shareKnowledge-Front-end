import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  open: boolean
  onCancel?: () => void
  onSubmit?: () => void
  title: string
  description: string
}

export default function SpDialog({ description, open, onCancel = () => {}, onSubmit = () => {}, title }: Props) {
  return (
    <div>
      <Dialog open={open} onClose={onCancel} aria-labelledby='draggable-dialog-title' sx={{ padding: '40px' }}>
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onSubmit} variant='contained' color='error'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
