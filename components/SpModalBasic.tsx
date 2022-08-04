import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

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
}

export default function SpModalBasic({ open, onClose = () => {}, children, title }: Props) {
  return (
    <div>
      <Modal open={open} onClose={onClose} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
        <Box sx={{ ...style, width: 400 }}>
          <h2 id='parent-modal-title'>{title}</h2>
          {children}
        </Box>
      </Modal>
    </div>
  )
}
