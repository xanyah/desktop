import { useCallback, useMemo, useRef } from 'react'
import { useShipping, useShippingProducts } from '../../hooks'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelShipping, validateShipping } from '../../api'
import { useTranslation } from 'react-i18next'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {DataTable} from '@/components'
import { Button, ShowContainer, ShowSection, Badge } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

import { shippingBadgeVariants } from '@/constants/shippings'
import { AxiosResponse } from 'axios'
import { uuidNumber } from '@/helpers/uuid'
import { formatLongDatetime } from '@/helpers/dates'
import toast from 'react-hot-toast'

const Shipping = () => {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const { data: shippingData } = useShipping(id)
  const { data: shippingProductsData } = useShippingProducts({
    'q[shippingIdEq]': id,
  })
  const toastId = useRef<string>(null)
  const { t } = useTranslation()
  useBreadCrumbContext([
    { label: t('shippings.pageTitle'), url: '/shippings' },
    {
      label: t('shipping.pageTitle', {
        shippingNumber: uuidNumber(shippingData?.data.id),
      }),
    },
  ])

  const useChangeShippingStatus = useCallback(
    (
      mutationFn: (
        storeId?: Store['id'],
      ) => Promise<AxiosResponse<Shipping, any>>,
    ) => {
      return useMutation({
        mutationFn: () => mutationFn(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['shippings', { id }] })
          toast.success(t('global.saved'), {
            id: toastId?.current || undefined,
          })
        },
        onMutate: () => {
          toastId.current = toast.loading(t('global.loading'))
        },
        onError: () => {
          toast.error(t('global.savingError'), {
            id: toastId?.current || undefined,
          })
        },
      })
    },
    [id],
  )

  const { mutate: cancelApiShipping } = useChangeShippingStatus(cancelShipping)
  const { mutate: validateApiShipping }
    = useChangeShippingStatus(validateShipping)

  const columnHelper = createColumnHelper<ShippingProduct>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('product.name', {
          header: t('shipping.productTable.name'),
          cell: props => (
            <Link
              className="underline"
              to={`/products/${props.row.original.product.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('quantity', {
          header: t('shipping.productTable.quantity'),
        }),
      ] as ColumnDef<ShippingProduct>[],
    [t, columnHelper],
  )

  const renderActionButtons = useCallback(() => {
    switch (shippingData?.data.state) {
      case 'pending':
        return (
          <>
            <Button variant="ghost" onClick={() => cancelApiShipping()}>
              {t('shipping.cancel')}
            </Button>
            <Button onClick={() => validateApiShipping()}>
              {t('shipping.validate')}
            </Button>
          </>
        )
      case 'cancelled':
        return (
          <Button onClick={() => validateApiShipping()}>
            {t('shipping.validate')}
          </Button>
        )
      case 'validated':
        return (
          <Button variant="ghost" onClick={() => cancelApiShipping()}>
            {t('shipping.cancel')}
          </Button>
        )
    }
  }, [t, shippingData, cancelApiShipping, validateApiShipping])

  if (!shippingData?.data) {
    return null
  }

  return (
    <ShowContainer
      title={t('shipping.pageTitle', {
        shippingNumber: uuidNumber(shippingData?.data.id),
      })}
      subtitle={t('shipping.pageSubtitle', {
        shippingDate: formatLongDatetime(shippingData?.data.createdAt),
      })}
      button={
        shippingData?.data && (
          <div className="flex flex-row gap-4 items-center">
            <Badge variant={shippingBadgeVariants[shippingData?.data.state]}>
              {t(`shipping.states.${shippingData?.data.state}`)}
            </Badge>
            {renderActionButtons()}
          </div>
        )
      }
    >
      <ShowSection title={t('shipping.customer')}>
        <div className="flex flex-col gap-2">
          <p>{shippingData.data.provider.name}</p>
        </div>
      </ShowSection>
      <ShowSection title={t('shipping.products')}>
        <DataTable data={shippingProductsData?.data || []} columns={columns} />
      </ShowSection>
    </ShowContainer>
  )
}

export default Shipping
