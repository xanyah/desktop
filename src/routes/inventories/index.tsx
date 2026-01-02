import { Link } from 'react-router-dom'
import { useCurrentStore, useInventories } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Inventories = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('inventories.pageTitle') }])
  const currentStore = useCurrentStore()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useInventories({
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Inventory>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('createdAt', {
          header: t('inventories.table.createdAt'),
          cell: props => (
            <Link
              className="underline"
              to={`/inventories/${props.row.original.id}`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('status', {
          header: t('inventories.table.status'),
        }),
      ] as ColumnDef<Inventory>[],
    [columnHelper, t],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('inventories.searchPlaceholder')}
      isLoading={isLoading}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Inventories
