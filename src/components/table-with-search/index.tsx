import { Loader, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import DataTableNew from '../data-table-new'
import { ColumnDef } from '@tanstack/react-table'
import Pagination from '../pagination'
import { isUndefined } from 'lodash'
import { Button, InputText } from '../ui'

type TableWithSearchProps<TData, TValue> = {
  searchPlaceholder: string
  onSearchQueryChange?: (query: string) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  searchQuery?: string
  isLoading: boolean
  createUrl?: string
  createLabel?: string
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
}

const TableWithSearch = <TData, TValue>({
  searchPlaceholder,
  onSearchQueryChange,
  searchQuery,
  isLoading,
  createLabel,
  createUrl,
  columns,
  data,
  totalPages,
  currentPage,
  onPageChange,
}: TableWithSearchProps<TData, TValue>) => (
  <div className="flex flex-1 flex-col items-stretch gap-4">
    <div className="flex flex-row items-center gap-4 justify-between">
      <div className="flex flex-row items-center gap-4">
        {!isUndefined(searchQuery) && onSearchQueryChange && (
          <InputText
            type="search"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            value={searchQuery}
            className="max-w-sm"
          />
        )}
        {isLoading && <Loader className="animate-spin" />}
      </div>

      {createUrl && createLabel && (
        <Button>
          <Link className="flex items-center gap-2" to={createUrl}>
            <Plus />
            {createLabel}
          </Link>
        </Button>
      )}
    </div>
    <DataTableNew data={data || []} columns={columns} />
    {totalPages && currentPage && onPageChange && (
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    )}
  </div>
)

export default TableWithSearch
