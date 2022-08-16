import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  placeHolder?: string
  onChange?: (value: any) => void
}

const InputSearch = ({ placeHolder = 'Buscar cursos', onChange }: Props) => {
  return (
    <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, m: '10px' }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder={placeHolder} inputProps={{ 'aria-label': 'search google maps' }} autoFocus onChange={onChange} />
      {/* <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton> */}
    </Paper>
  )
}

export default InputSearch
