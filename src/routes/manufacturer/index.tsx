import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useManufacturer, useCurrentStore, usePaginatedSearch, useProducts } from '../../hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createManufacturer, updateManufacturer } from '../../api'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { manufacturerSchema, manufacturerSchemaType } from './config'
import { Controller, useForm } from 'react-hook-form'
import { FormContainer, FormSection, InputText, DataTable, Pagination } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import toast from 'react-hot-toast'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { formatPrice } from '@/helpers/price'

const Manufacturer = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const store = useCurrentStore()
  const { id } = useParams()
  const toastId = useRef<string>(null)
  const { data: manufacturerData } = useManufacturer(id)
  const { handleSubmit, control, reset } = useForm<manufacturerSchemaType>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {},
  })

  const pageTitle = useMemo(
    () => manufacturerData?.data ? manufacturerData?.data.name : t('manufacturer.newPageTitle'),
    [t, manufacturerData],
  )

  useBreadCrumbContext([
    { label: t('manufacturers.pageTitle'), url: '/manufacturers' },
    { label: pageTitle },
  ])

  const { mutate: createApiManufacturer } = useMutation({
    mutationFn: (newData: manufacturerSchemaType) =>
      createManufacturer({ ...newData, storeId: store?.id }),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['manufacturers', { id }], data)
      navigate(`/manufacturers/${data.data.id}/edit`)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const { mutate: updateApiManufacturer } = useMutation({
    mutationFn: (newData: manufacturerSchemaType) => updateManufacturer(id, newData),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['manufacturers', { id }], data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const onSubmit = useCallback((data: manufacturerSchemaType) => {
    if (id) {
      return updateApiManufacturer(data)
    }
    return createApiManufacturer(data)
  }, [id, updateApiManufacturer, createApiManufacturer])

  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()

  const { data: productsData } = useProducts({
    'q[archivedAtNull]': true,
    'q[manufacturerIdEq]': id,
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
    reset(manufacturerData?.data)
  }, [manufacturerData, reset])

  return (
    <>
      <FormContainer
        title={pageTitle}
        subtitle={t('manufacturer.pageSubtitle')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection
          title={t('manufacturer.generalInformations')}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                id="name"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder={t('manufacturer.namePlaceholder')}
                type="text"
                label={t('manufacturer.nameLabel')}
              />
            )}
          />
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                id="code"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder={t('manufacturer.codePlaceholder')}
                type="text"
                hint={t('manufacturer.codeHint')}
                label={t('manufacturer.codeLabel')}
              />
            )}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder={t('manufacturer.notesPlaceholder')}
                type="text"
                label={t('manufacturer.notesPlaceholder')}
              />
            )}
          />
        </FormSection>
      </FormContainer>

      {id && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('manufacturer.productsTitle')}</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={e => onSearchQueryChange(e.target.value)}
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

export default Manufacturer
