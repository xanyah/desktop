import { useState } from 'react'
import { orderFormat } from '../../types'


import { useCurrentStore, useOrder } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import DataDetails from "../../components/data-details";
import { useMutation } from "@tanstack/react-query";
import { createOrder, updateOrder } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { Trans, useTranslation } from "react-i18next";

const Order = () => {
  const navigate = useNavigate();
  const store = useCurrentStore();
  const { id } = useParams();
  const { data: orderData } = useOrder(id);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();

  const { mutate: createApiOrder } = useMutation({
    mutationFn: (newData: any) =>
      createOrder({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      navigate(`/orders/${data.data.id}`);
      setIsEditing(false);
      showSuccessToast(
        t("toast.created", { entity: t("models.orders.title") })
      );
    },
  });

  const { mutate: updateApiOrder } = useMutation({
    mutationFn: (newData) => updateOrder(id, newData),
    onSuccess: () => {
      setIsEditing(false);
      showSuccessToast(t("toast.updated"));
    },
  });

  const renderOrderVariants = () => {
    const orderVariants = orderData?.data?.orderVariants;

    return (
      <div className="order-variants">
        <label className="embed-table-title no-padding">
          <Trans i18nKey="models.orders.title" />{" "}
          <Trans i18nKey="models.variants.title" />
        </label>
        <div className="embed-table no-padding">
          <div className="row header-row">
            <div className="column productName">
              <Trans i18nKey="models.variants.barcode" />
            </div>
            <div className="column variantName">
              <Trans i18nKey="models.products.name" />
            </div>
            <div className="column quantity">
              <Trans i18nKey="models.variants.quantity" />
            </div>
          </div>
          {orderVariants?.map((orderVariant) => (
            <div className="row" key={orderVariant.id}>
              <div className="column productName">
                {orderVariant.variant.barcode}
              </div>
              <div className="column variantName">
                {orderVariant.variant.product.name}
              </div>
              <div className="column quantity">{orderVariant.quantity}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

    return (
      <>
        <h1 className="data-details-title">{orderData?.data?.name}</h1>
        <DataDetails
          createEntity={createApiOrder}
          currentEntity={orderData?.data}
          editing={isEditing}
          formattedData={orderFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="orders"
          updateEntity={updateApiOrder}
        >
          {renderOrderVariants()}
        </DataDetails>
      </>
    )
}

export default Order;
