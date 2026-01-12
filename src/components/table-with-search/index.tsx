import { Loader, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import DataTable from '../data-table'
import { ColumnDef } from '@tanstack/react-table'
import Pagination from '../pagination'
import { isUndefined } from 'lodash'
import { InputText } from '../input'
import Button from '../button'
import { useTranslation } from 'react-i18next'
import { ReactNode, useState } from 'react'

interface TableWithSearchProps<TData, TValue> {
  searchPlaceholder: string
  onSearchQueryChange?: (query: string) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  searchQuery?: string
  isLoading: boolean
  totalElements?: string
  createUrl?: string
  createLabel?: string
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  children?: ReactNode
  filtersLabel?: string
}

const TableWithSearch = <TData, TValue>({
  searchPlaceholder,
  onSearchQueryChange,
  searchQuery,
  isLoading,
  totalElements,
  createLabel,
  createUrl,
  columns,
  data,
  totalPages,
  currentPage,
  onPageChange,
  children,
  filtersLabel,
}: TableWithSearchProps<TData, TValue>) => {
  const { t } = useTranslation()
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex flex-1 flex-col items-stretch gap-4">
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex flex-row items-center gap-4">
          {!isUndefined(searchQuery) && onSearchQueryChange && (
            <InputText
              type="search"
              placeholder={searchPlaceholder}
              onChange={e => onSearchQueryChange(e.target.value)}
              value={searchQuery}
              className="w-xs"
            />
          )}
          <p className="text-xs text-slate-600 whitespace-nowrap">
            {t('global.elementsCount', { count: parseInt(totalElements ?? '0', 10) })}
          </p>
          {isLoading && <Loader className="animate-spin" />}
        </div>

        <div className="flex items-center gap-4">
          {children && (
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {filtersLabel || t('global.filters')}
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          {createUrl && createLabel && (
            <Button>
              <Link className="flex items-center gap-2" to={createUrl}>
                <Plus />
                {createLabel}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {children && showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          {children}
        </div>
      )}

      <DataTable data={data || []} columns={columns} />
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
}

export default TableWithSearch
