import { memo } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Button, DialogActions, IconButton } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { proccessTable } from '../Types/typeTable'
import useHeaderTable from './Hooks/useHeaderTable'
import Actions from './Actions'
import moment from 'moment'
import CheckIcon from '@mui/icons-material/Check'
import AddBoxIcon from '@mui/icons-material/AddBox'
import styleTable from './table.module.scss'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

interface Props {
  rows: any[]
  name: proccessTable
  isTitle?: boolean
  children?: JSX.Element | JSX.Element[]
  onEditOronDelete?: (row: any, proceso: string) => void
  isAccion?: boolean
  onButtonNew?: (row: any) => void
  onSelect?: (row: any) => void
  height?: string
}

const SpTable = ({ isTitle = true, children, onButtonNew, name = 'Usuarios', rows, onEditOronDelete = () => {}, isAccion = true, onSelect = () => {}, height = '100%' }: Props) => {
  const header = useHeaderTable(name)

  switch (name) {
    case 'Usuarios':
      rows = rows
        .map((row: any) => {
          return {
            ...row,
            acciones: <Actions onEditOronDelete={onEditOronDelete} id={row.id} />,
          }
        })
        .filter((row: any) => row.rol !== 'ADMINISTRADOR')
      break
    case 'Cursos':
    case 'Categorias':
    case 'Materiales':
      rows = rows.map((row: any) => {
        return {
          ...row,
          creado: moment(row.creado).format('DD/MM/YYYY'),
          acciones: isAccion ? (
            <Actions onEditOronDelete={onEditOronDelete} id={row.id} />
          ) : (
            <IconButton type='submit' aria-label='search' onClick={() => onSelect(row)}>
              <CheckIcon color='success' />
            </IconButton>
          ),
        }
      })
      break
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
        {isTitle && (
          <Box sx={{ flex: 'auto' }}>
            <h1>{name}</h1>
          </Box>
        )}
        <Box sx={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
          {onButtonNew && (
            <DialogActions>
              <Button type='submit' variant='contained' color='success' endIcon={<AddBoxIcon />} onClick={onButtonNew}>
                Nuevo
              </Button>
            </DialogActions>
          )}
          {children}
        </Box>
      </Box>
      <TableContainer component={Paper} className={styleTable.table}>
        <Table aria-label='customized table'>
          <TableHead className={styleTable.thead}>
            <TableRow>
              {header.map((column, index) => (
                <StyledTableCell key={index}>{column.value}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styleTable.tbody} style={{ height: height }}>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                {header.map((column, index) => (
                  <StyledTableCell key={index}>{row[column.value]}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default memo(SpTable)
