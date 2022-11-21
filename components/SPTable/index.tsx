import React, { useEffect, useState } from 'react'
import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import MaterialReactTable from 'material-react-table'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { ITableParams } from './Types/ITable'
import { nameComponents } from '../../types/Columns'
import useColumns from './Hooks/useColumns'

export type operaciones = 'create' | 'edit' | 'delete'

interface Props {
  name: nameComponents
  fetchData(params: ITableParams): Promise<any>
  handle(row: any, op: operaciones): void
}

const SpTableMaterial = ({ name, fetchData, handle }: Props) => {
  const [tableData, setTableData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [rowCount, setRowCount] = useState(0)
  const [isError, setIsError] = useState(false)

  //table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  useEffect(() => {
    const fetchData2 = async () => {
      const params: ITableParams = {
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex + 1,
        // sortBy: sorting,
        // filters: columnFilters,
        globalFilter: globalFilter,
      }

      try {
        const response = await fetchData(params)
        console.log(response)
        setTableData(response.docs)
        setRowCount(response.totalDocs)
      } catch (error) {
        setIsError(true)
        console.error(error)
        return
      }
      setIsError(false)
      setIsLoading(false)
      setIsRefetching(false)
    }
    fetchData2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting])

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={useColumns({ name })}
        data={tableData}
        // editingMode='modal' //default
        enableColumnOrdering
        enableEditing
        rowCount={rowCount}
        onEditingRowSave={(e) => handle(e, 'edit')}
        manualPagination
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement='left' title='Edit'>
              <IconButton
                onClick={() => {
                  const user = row.original
                  handle(user, 'edit')
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton color='error' onClick={() => handle(row, 'delete')}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color='primary' onClick={(e) => handle(e, 'create')} variant='contained'>
            {'Nuevo ' + name}
          </Button>
        )}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
            padding: '100px',
          },
        }}
        state={{
          // columnFilters,
          // sorting,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
        }}
      />
    </>
  )
}
export default SpTableMaterial
