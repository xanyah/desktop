import { useCurrentStore, useClients } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Clients = () => {
  useBreadCrumbContext([{ label: 'Clients' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading } = useClients({
    'q[firstnameOrLastnameCont]': searchQuery,
    'q[toreIdEq]': currentStore?.id
  })

  const columnHelper = createColumnHelper<Client>()

  const columns = useMemo(() => ([
    columnHelper.accessor('firstname', {
      header: 'Firstname'
    }),
    columnHelper.accessor('lastname', {
      header: 'Lastname',
    }),
  ]) as ColumnDef<Client>[], [columnHelper])

  return (
    <TableWithSearch
      searchPlaceholder="Search a client"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/clients/new'}
      createLabel={'Create a client'}
      columns={columns}
      data={data?.data}
    />
  )

}

export default Clients
