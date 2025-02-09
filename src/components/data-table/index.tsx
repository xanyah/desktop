import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { map, size } from 'lodash'
import {
  StyledTable,
  StyledTableBody,
  StyledTableBorder,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
} from './styles'
import { useTranslation } from 'react-i18next'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const {t} = useTranslation()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <StyledTableContainer>
      <StyledTableBorder>
        <StyledTable>
          <StyledTableHeader>
            {map(table.getHeaderGroups(), headerGroup => (
              <StyledTableRow key={headerGroup.id}>
                {map(headerGroup.headers, header => (
                  <StyledTableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </StyledTableHead>
                ))}
              </StyledTableRow>
            ))}
          </StyledTableHeader>
          <StyledTableBody>
            {size(table.getRowModel().rows)
              ? (
                  map(table.getRowModel().rows, row => (
                    <StyledTableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {map(row.getVisibleCells(), cell => (
                        <StyledTableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))
                )
              : (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {t('components.dataTable.noResults')}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
          </StyledTableBody>
        </StyledTable>
      </StyledTableBorder>
    </StyledTableContainer>
  )
}

export default DataTable
