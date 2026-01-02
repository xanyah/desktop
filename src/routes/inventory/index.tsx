import {
  useInventory,
  useInventoryProducts,
  usePaginatedSearch,
} from '../../hooks'
import { Link, useParams } from 'react-router-dom'
import { Badge, TableWithSearch } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

const Inventory = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data: inventoryData } = useInventory(id)

  useBreadCrumbContext([
    { label: t('inventories.pageTitle'), url: '/inventories' },
    { label: inventoryData?.data.createdAt || '' },
  ])

  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()
  const { data: inventoryProductsData, isLoading } = useInventoryProducts({
    'q[inventoryIdEq]': inventoryData?.data?.id,
    'q[productNameOrProductSkuOrProductManufacturerSkuOrProductUpcCont]': searchQuery,
    // 'q[invalidQuantity]': 1,
    'q[s]': 'updated_at desc',
    'page': page,
  })

  const columnHelper = createColumnHelper<InventoryProduct>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('product.sku', {
          header: t('inventory.table.sku'),
          cell: props => (
            <Link
              className="underline"
              to={`/products/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('product.manufacturerSku', {
          header: t('inventory.table.manufacturerSku'),
        }),
        columnHelper.accessor('product.name', {
          header: t('inventory.table.name'),
        }),
        columnHelper.accessor('quantity', {
          header: t('inventory.table.newQuantity'),
        }),
        columnHelper.accessor('product.quantity', {
          header: t('inventory.table.currentQuantity'),
        }),
        columnHelper.accessor('product.quantity', {
          header: t('inventory.table.status'),
          cell: props => props.row.original.product.quantity === props.row.original.quantity
            ? (
                <Badge variant="success">
                  {t('inventory.table.statusOk')}
                </Badge>
              )
            : (
                <Badge variant="warning">
                  {t('inventory.table.statusMismatch')}
                </Badge>
              ),
        }),
      ] as ColumnDef<InventoryProduct>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('products.searchPlaceholder')}
      onSearchQueryChange={onSearchQueryChange}
      currentPage={page}
      totalPages={inventoryProductsData?.headers['total-pages']}
      totalElements={inventoryProductsData?.headers['total-count']}
      onPageChange={setPage}
      searchQuery={searchQuery}
      isLoading={isLoading}
      columns={columns}
      data={inventoryProductsData?.data}
    />
  )
}

export default Inventory
