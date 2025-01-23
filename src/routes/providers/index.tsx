import { Link } from 'react-router-dom'
import { useCurrentStore, useProviders } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Providers = () => {
  useBreadCrumbContext([{ label: 'Providers' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading } = useProviders({
    'q[nameOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id
  })

  const columnHelper = createColumnHelper<Provider>()

  const columns = useMemo(() => ([
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (props) => <Link className='underline' to={`/providers/${props.row.original.id}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor('shippingsCount', {
      header: '# of shippings',
    }),
  ]) as ColumnDef<Provider>[], [columnHelper])

  return (
    <TableWithSearch
      searchPlaceholder="Search a provider"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/providers/new'}
      createLabel={'Create a provider'}
      columns={columns}
      data={data?.data}
    />
  )

}

export default Providers
