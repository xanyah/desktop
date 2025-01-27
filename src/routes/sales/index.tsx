import { Link } from 'react-router-dom'
import { useCurrentStore, useSales } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formatPrice } from '@/helpers/price'

const Sales = () => {
  useBreadCrumbContext([{ label: 'Sales' }])
  const currentStore = useCurrentStore()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSales({
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Sale>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('createdAt', {
          header: 'Date of creation',
          cell: (props) => (
            <Link className="underline" to={`/sales/${props.row.original.id}`}>
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('totalAmountCents', {
          header: 'Date of creation',
          cell: (props) => (
            <span>
              {formatPrice(
                props.getValue(),
                props.row.original.totalAmountCurrency
              )}
            </span>
          ),
        }),
        columnHelper.accessor(
          (row) => `${row.user.firstname} ${row.user.lastname}`,
          {
            id: 'fullname',
            header: 'User',
            cell: (props) => (
              <Link
                className="underline"
                to={`/users/${props.row.original.user.id}`}
              >
                {props.getValue()}
              </Link>
            ),
          }
        ),
      ] as ColumnDef<Sale>[],
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a sale"
      isLoading={isLoading}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Sales
