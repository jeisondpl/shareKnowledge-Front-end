import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { DialogActions, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

interface Props {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  title: string
  width?: number
}

const SpModalBasic = ({ open, onClose = () => {}, children, title, width = 400 }: Props) => {
  return (
    <div>
      <Modal open={open} onClose={onClose} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
        <Box sx={{ ...style, width: width }}>
          <DialogActions>
            <IconButton type='submit' aria-label='search' onClick={onClose}>
              <CloseIcon sx={{ marginLeft: '10px' }} />
            </IconButton>
          </DialogActions>
          <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>{title}</Box>
          {children}
        </Box>
      </Modal>
    </div>
  )
}

export default SpModalBasic
