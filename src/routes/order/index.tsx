import { useCallback, useMemo, useRef } from 'react'
import { useOrder, useOrderProducts } from '../../hooks'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder, deliverOrder, orderOrder, withdrawOrder } from '../../api'
import { useTranslation } from 'react-i18next'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {DataTable} from '@/components'
import { Button, ShowContainer, ShowSection, Badge } from '@/components'
import { customerFullname } from '@/helpers/customer'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

import { orderBadgeVariants } from '@/constants/orders'
import { AxiosResponse } from 'axios'
import { uuidNumber } from '@/helpers/uuid'
import { formatLongDatetime } from '@/helpers/dates'
import toast from 'react-hot-toast'

const Order = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const { data: orderData } = useOrder(id)
  const { data: orderProductsData } = useOrderProducts({
    'q[orderIdEq]': id,
  })
  const toastId = useRef<string>(null)
  useBreadCrumbContext([
    { label: t('orders.pageTitle'), url: '/orders' },
    {
      label: t('order.pageTitle', {
        orderNumber: uuidNumber(orderData?.data.id),
      }),
    },
  ])

  const useChangeOrderStatus = useCallback(
    (
      mutationFn: (storeId?: Store['id']) => Promise<AxiosResponse<Order, any>>,
    ) => {
      return useMutation({
        mutationFn: () => mutationFn(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['orders', { id }] })
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

  const { mutate: cancelApiOrder } = useChangeOrderStatus(cancelOrder)
  const { mutate: orderApiOrder } = useChangeOrderStatus(orderOrder)
  const { mutate: withdrawApiOrder } = useChangeOrderStatus(withdrawOrder)
  const { mutate: deliverApiOrder } = useChangeOrderStatus(deliverOrder)

  const columnHelper = createColumnHelper<OrderProduct>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('product.name', {
          header: t('order.productTable.name'),
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
          header: t('order.productTable.quantity'),
        }),
      ] as ColumnDef<OrderProduct>[],
    [t, columnHelper],
  )

  const renderActionButtons = useCallback(() => {
    switch (orderData?.data.state) {
      case 'delivered':
        return (
          <>
            <Button variant="ghost" onClick={() => cancelApiOrder()}>
              {t('order.cancel')}
            </Button>
            <Button onClick={() => withdrawApiOrder()}>
              {t('order.withdraw')}
            </Button>
          </>
        )
      case 'ordered':
        return (
          <>
            <Button variant="ghost" onClick={() => cancelApiOrder()}>
              {t('order.cancel')}
            </Button>
            <Button onClick={() => deliverApiOrder()}>
              {t('order.deliver')}
            </Button>
          </>
        )
      case 'pending':
        return (
          <>
            <Button variant="ghost" onClick={() => cancelApiOrder()}>
              {t('order.cancel')}
            </Button>
            <Button onClick={() => orderApiOrder()}>{t('order.order')}</Button>
          </>
        )
      case 'cancelled':
      case 'withdrawn':
        return null
    }
  }, [
    t,
    orderData,
    cancelApiOrder,
    deliverApiOrder,
    orderApiOrder,
    withdrawApiOrder,
  ])

  if (!orderData?.data) {
    return null
  }

  return (
    <ShowContainer
      title={t('order.pageTitle', {
        orderNumber: uuidNumber(orderData.data.id),
      })}
      subtitle={t('order.pageTitle', {
        orderDate: formatLongDatetime(orderData.data.createdAt),
      })}
      button={
        orderData?.data && (
          <div className="flex flex-row gap-4 items-center">
            <Badge variant={orderBadgeVariants[orderData?.data.state]}>
              {t(`order.states.${orderData?.data.state}`)}
            </Badge>
            {renderActionButtons()}
          </div>
        )
      }
    >
      <ShowSection title={t('order.customer')}>
        <div className="flex flex-col gap-2">
          <p>{customerFullname(orderData.data.customer)}</p>
          <p>{orderData.data.customer.address}</p>
          <a href={`mailto:${orderData.data.customer.email}`}>
            {orderData.data.customer.email}
          </a>
          <a href={`tel:${orderData.data.customer.phone}`}>
            {orderData.data.customer.phone}
          </a>
        </div>
      </ShowSection>
      <ShowSection title={t('order.products')}>
        <DataTable data={orderProductsData?.data || []} columns={columns} />
      </ShowSection>
    </ShowContainer>
  )
}

export default Order
