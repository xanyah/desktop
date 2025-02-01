import { useCallback, useMemo } from 'react'
import { useOrder, useOrderProducts } from "../../hooks";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, deliverOrder, orderOrder, withdrawOrder } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { useTranslation } from "react-i18next";
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/data-table-new';
import { Button, ShowContainer, ShowSection } from '@/components';
import { DateTime } from 'luxon';
import { customerFullname } from '@/helpers/customer';
import { useBreadCrumbContext } from '@/contexts/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { orderBadgeVariants, orderNumber } from '@/constants/orders';
import { AxiosResponse } from 'axios';

const Order = () => {
  const queryClient = useQueryClient()
  const { id } = useParams();
  const { data: orderData } = useOrder(id);
  const { data: orderProductsData } = useOrderProducts({
    'q[orderIdEq]': id
  })
  const { t } = useTranslation();
  useBreadCrumbContext([
    { label: 'Commandes', url: '/orders' },
    { label: `Commande ${orderNumber(orderData?.data)}` },
  ])

  const onSuccess = useCallback(() => {
    showSuccessToast(t("toast.updated"));
    queryClient.invalidateQueries({ queryKey: ['orders', { id }] })
  }, [t, id, queryClient])

  const useChangeOrderStatus = useCallback((mutationFn: (storeId?: Store['id']) => Promise<AxiosResponse<Order, any>>) => {
    return useMutation({
      mutationFn: () => mutationFn(id),
      onSuccess,
    });
  }, [id, onSuccess])

  const { mutate: cancelApiOrder } = useChangeOrderStatus(cancelOrder);
  const { mutate: orderApiOrder } = useChangeOrderStatus(orderOrder);
  const { mutate: withdrawApiOrder } = useChangeOrderStatus(withdrawOrder);
  const { mutate: deliverApiOrder } = useChangeOrderStatus(deliverOrder);

  const columnHelper = createColumnHelper<OrderProduct>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('product.name', {
          header: 'Name',
          cell: (props) => (
            <Link
              className="underline"
              to={`/products/${props.row.original.product.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('quantity', {
          header: 'Quantité',
        }),
      ] as ColumnDef<OrderProduct>[],
    [columnHelper]
  )

  const renderActionButtons = useCallback(() => {
    switch(orderData?.data.state) {
      case 'delivered':
        return <>
        <Button variant="ghost" onClick={() => cancelApiOrder()}>Cancel</Button>
        <Button onClick={() => withdrawApiOrder()}>Commande retirée</Button>
        </>
        case 'ordered':
          return <>
          <Button variant="ghost" onClick={() => cancelApiOrder()}>Cancel</Button>
          <Button onClick={() => deliverApiOrder()}>Commande reçue</Button>
          </>
          case 'pending':
            return <>
            <Button variant="ghost" onClick={() => cancelApiOrder()}>Cancel</Button>
            <Button onClick={() => orderApiOrder()}>Commande envoyée</Button>
            </>
      case 'cancelled':
      case 'withdrawn':
        return null
    }
  }, [orderData, cancelApiOrder, deliverApiOrder, orderApiOrder, withdrawApiOrder])

  if (!orderData?.data) {
    return null
  }

  return <ShowContainer
    title={`Commande ${orderNumber(orderData?.data)}`}
    subtitle={orderData?.data && `Commande passée le ${DateTime.fromISO(orderData?.data.createdAt).toLocaleString()}`}
    button={orderData?.data && (
      <div className="flex flex-row gap-4 items-center">
        <Badge variant={orderBadgeVariants[orderData?.data.state]}>
          {orderData?.data.state}
        </Badge>
        {renderActionButtons()}
      </div>)}
  >
    <ShowSection title="Client">
      <div className="flex flex-col gap-2">
        <p>{customerFullname(orderData.data.customer)}</p>
        <p>{orderData.data.customer.address}</p>
        <a href={`mailto:${orderData.data.customer.email}`}>{orderData.data.customer.email}</a>
        <a href={`tel:${orderData.data.customer.phone}`}>{orderData.data.customer.phone}</a>
      </div>
    </ShowSection>
    <ShowSection title="Produits de la commande">
      <DataTable data={orderProductsData?.data || []} columns={columns} />
    </ShowSection>
  </ShowContainer>
}

export default Order;
