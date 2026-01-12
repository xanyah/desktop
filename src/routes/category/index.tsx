import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCategory, useCurrentStore, usePaginatedSearch, useProducts } from '../../hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory, updateCategory } from '../../api'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, categorySchemaType } from './config'
import { Controller, useForm } from 'react-hook-form'
import { CategorySelect, FormContainer, FormSection, InputText } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import toast from 'react-hot-toast'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { formatPrice } from '@/helpers/price'
import { DataTable, Pagination } from '@/components'

const Category = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const store = useCurrentStore()
  const { id } = useParams()
  const { data: categoryData } = useCategory(id)
  const { handleSubmit, control, reset } = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {},
  })
  const toastId = useRef<string>(null)
  const pageTitle = useMemo(
    () => categoryData?.data ? categoryData?.data.name : t('category.newCategoryPageTitle'),
    [t, categoryData],
  )
  useBreadCrumbContext([
    { label: t('categories.pageTitle'), url: '/categories' },
    { label: pageTitle },
  ])

  const { mutate: createApiCategory } = useMutation({
    mutationFn: (newData: categorySchemaType) =>
      createCategory({ ...newData, storeId: store?.id }),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      queryClient.setQueryData(['categories', { id }], data)
      navigate(`/categories/${data.data.id}/edit`)
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const { mutate: updateApiCategory } = useMutation({
    mutationFn: (newData: categorySchemaType) => updateCategory(id, newData),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      queryClient.setQueryData(['categories', { id }], data)
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const onSubmit = useCallback((data: categorySchemaType) => {
    if (id) {
      return updateApiCategory(data)
    }
    return createApiCategory(data)
  }, [id, updateApiCategory, createApiCategory])

  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()

  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    'q[archivedAtNull]': true,
    'q[categoryIdEq]': id,
    'q[nameOrSkuOrManufacturerSkuOrUpcCont]': searchQuery,
    'q[storeIdEq]': store?.id,
    'q[s]': ['name', 'manufacturers.name'],
    'page': page,
    'items': 20,
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

  useEffect(() => {
    if (categoryData?.data) {
      reset({
        ...categoryData?.data,
        categoryId: categoryData?.data?.category?.id,
      })
    }
  }, [categoryData, reset])

  return (
    <>
      <FormContainer
        title={pageTitle}
        subtitle={t('category.pageSubtitle')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection
          title={t('category.generalInformations')}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder={t('category.namePlaceholder')}
                type="text"
                label={t('category.nameLabel')}
              />
            )}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CategorySelect
                error={error?.message}
                onChange={onChange}
                value={value}
                label={t('category.parentCategoryLabel')}
                placeholder={t('category.parentCategoryPlaceholder')}
              />
            )}
          />
        </FormSection>
      </FormContainer>

      {id && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('category.productsTitle')}</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
            />
          </div>
          <DataTable
            columns={columns}
            data={productsData?.data || []}
          />
          {productsData?.data && productsData.data.length > 0 && (
            <div className="mt-4">
              <Pagination
                currentPage={page}
                totalPages={parseInt(productsData?.headers['total-pages'] || '1')}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Category
