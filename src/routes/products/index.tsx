import { Link } from 'react-router-dom'
import { useCurrentStore, usePaginatedSearch, useProducts } from '../../hooks'
import { CategorySelect, ManufacturerSelect, TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { formatPrice } from '@/helpers/price'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Products = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('products.pageTitle') }])
  const currentStore = useCurrentStore()
  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()
  const [parentCategoryId, setParentCategoryId] = useState<string | undefined>()
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>()
  const [manufacturerId, setManufacturerId] = useState<string | undefined>()
  const [stockFilter, setStockFilter] = useState<string | undefined>()

  const { data, isLoading } = useProducts({
    'q[archivedAtNull]': true,
    'q[nameOrSkuOrManufacturerSkuOrUpcCont]': searchQuery,
    'q[categoryIdEq]': subCategoryId,
    'q[categoryIdOrCategoryCategoryIdEq]': !subCategoryId ? parentCategoryId : undefined,
    'q[manufacturerIdEq]': manufacturerId,
    'q[quantityGt]': stockFilter === 'in_stock' ? 0 : undefined,
    'q[quantityEq]': stockFilter === 'out_of_stock' ? 0 : undefined,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name', 'manufacturers.name'],
    'page': page,
  })

  const columnHelper = createColumnHelper<Product>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('sku', {
          header: t('products.table.sku'),
          cell: props => (
            <Link
              className="underline"
              to={`/products/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('manufacturerSku', {
          header: t('products.table.manufacturerSku'),
        }),
        columnHelper.accessor('name', {
          header: t('products.table.name'),
        }),
        columnHelper.accessor('category.name', {
          header: t('products.table.category'),
          cell: props => (
            <Link
              className="underline"
              to={`/categories/${props.row.original.category?.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('manufacturer.name', {
          header: t('products.table.manufacturer'),
          cell: props => (
            <Link
              className="underline"
              to={`/manufacturers/${props.row.original.manufacturer?.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('quantity', {
          header: t('products.table.quantity'),
        }),
        columnHelper.accessor('amountCents', {
          header: t('products.table.amount'),
          cell: props => (
            <span>
              {formatPrice(props.getValue(), props.row.original.amountCurrency)}
            </span>
          ),
        }),
      ] as ColumnDef<Product>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('products.searchPlaceholder')}
      onSearchQueryChange={onSearchQueryChange}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      totalElements={data?.headers['total-count']}
      onPageChange={setPage}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/products/new"
      createLabel={t('products.createButtonLabel')}
      columns={columns}
      data={data?.data}
      filtersLabel={t('products.filtersLabel')}
    >
      <div className="grid grid-cols-2 gap-4">
        <CategorySelect
          onChange={(value) => {
            setParentCategoryId(value)
            setSubCategoryId(undefined)
          }}
          value={parentCategoryId}
          label={t('products.parentCategoryFilterLabel')}
          placeholder={t('products.parentCategoryFilterPlaceholder')}
          noSubcategories
        />
        {parentCategoryId && (
          <CategorySelect
            onChange={setSubCategoryId}
            value={subCategoryId}
            label={t('products.subCategoryFilterLabel')}
            placeholder={t('products.subCategoryFilterPlaceholder')}
            categoryId={parentCategoryId}
          />
        )}
        <ManufacturerSelect
          onChange={setManufacturerId}
          value={manufacturerId}
          label={t('products.manufacturerFilterLabel')}
          placeholder={t('products.manufacturerFilterPlaceholder')}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('products.stockFilterLabel')}
          </label>
          <select
            value={stockFilter || ''}
            onChange={(e) => setStockFilter(e.target.value || undefined)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('products.stockFilterAll')}</option>
            <option value="in_stock">{t('products.stockFilterInStock')}</option>
            <option value="out_of_stock">{t('products.stockFilterOutOfStock')}</option>
          </select>
        </div>
      </div>
    </TableWithSearch>
  )
}

export default Products
