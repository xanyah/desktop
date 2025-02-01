import { Link } from 'react-router-dom'
import { useCurrentStore, useCustomers } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Customers = () => {
  useBreadCrumbContext([{ label: 'Customers' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useCustomers({
    page,
    'q[firstnameOrLastnameOrPhoneOrEmailOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Customer>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor(item => `${item.firstname} ${item.lastname}`, {
          header: 'Nom',
          cell: (props) => (
            <Link
              className="underline"
              to={`/customers/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('phone', { header: 'Téléphone'}),
        columnHelper.accessor('email', { header: 'Adresse e-mail'}),
      ] as ColumnDef<Customer>[],
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a customer"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/customers/new'}
      createLabel={'Create a customer'}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Customers
