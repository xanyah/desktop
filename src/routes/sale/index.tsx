import { formatPrice } from "../../utils/data-helper";

import "./styles.scss";
import { useSale } from "../../hooks";
import { useParams } from "react-router-dom";
import ItemAttribute from "../../components/item-attribute";
import { Trans } from "react-i18next";

const Sale = () => {
  const { id } = useParams();
  const { data: saleData } = useSale(id);

  const renderSalePayments = () => {
    return (
      <div className="sale-payments">
        <h3>
          <Trans i18nKey="models.sales.salePaymentTitle" />
        </h3>
        {saleData?.data?.salePayments?.map((salePayment) => (
          <div key={salePayment.id} className="sale-payments-content">
            {salePayment.total && (
              <ItemAttribute
                attribute="salePaymentTotal"
                key="salePaymentTotal"
                value={formatPrice(salePayment.total)}
                type="text"
                model="sales"
              />
            )}
            {salePayment.paymentType && (
              <div className="sale-payments-type">
                <ItemAttribute
                  attribute="salePaymentTypeName"
                  key="salePaymentTypeName"
                  value={salePayment.paymentType.name}
                  type="text"
                  model="sales"
                />
                <ItemAttribute
                  attribute="salePaymentTypeDescription"
                  key="salePaymentTypeDescription"
                  value={salePayment.paymentType.description}
                  type="text"
                  model="sales"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSaleVariants = () => {
    return (
      <div className="sale-variants">
        <h3>
          <Trans i18nKey="models.products.title" />
        </h3>
        <div className="sale-variant-header">
          <div className="product-name">
            <Trans i18nKey="models.products.name" />
          </div>
          <div className="variant-barcode">
            <Trans i18nKey="models.variants.barcode" />
          </div>
          <div className="quantity">
            <Trans i18nKey="models.variants.quantity" />
          </div>
          <div className="unit-price">
            <Trans i18nKey="models.variants.unitPrice" />
          </div>
          <div className="promotion">
            <Trans i18nKey="models.sales.saleVariantPromotion" />
          </div>
        </div>
        {saleData?.data?.saleVariants?.map((saleVariant) => (
          <div className="sale-variant" key={saleVariant.id}>
            <div className="product-name">
              {saleVariant.variant.product.name}
            </div>
            <div className="variant-barcode">{saleVariant.variant.barcode}</div>
            <div className="quantity">{saleVariant.quantity}</div>
            <div className="unit-price">{saleVariant.unitPrice}</div>
            <div className="promotion">
              {saleVariant.saleVariantPromotion
                ? saleVariant.saleVariantPromotion.type == "flat_discount"
                  ? formatPrice(saleVariant.saleVariantPromotion.amount)
                  : `${saleVariant.saleVariantPromotion.amount} %`
                : "/"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSaleInfos = () => {
    const { store, user, client, salePromotion, totalPrice } =
      saleData?.data || {};

    return (
      <div className="sale-informations">
        {store && (
          <div className="sale-store">
            <h3>
              <Trans i18nKey="models.stores.title" />
            </h3>
            <div className="sale-store-content row">
              <ItemAttribute
                attribute="storeName"
                key="storeName"
                value={store.name}
                type="text"
                model="sales"
              />

              <ItemAttribute
                attribute="storeCountry"
                key="storeCountry"
                value={store.country}
                type="text"
                model="sales"
              />
            </div>
          </div>
        )}
        {user && (
          <div className="sale-user">
            <h3>
              <Trans i18nKey="models.sales.shopkeeper" />
            </h3>
            <div className="sale-user-content row">
              <ItemAttribute
                attribute="userFirstname"
                key="userFirstname"
                value={user.firstname}
                type="text"
                model="sales"
              />

              <ItemAttribute
                attribute="userLastname"
                key="userLastname"
                value={user.lastname}
                type="text"
                model="sales"
              />
            </div>
          </div>
        )}
        {client && (
          <div className="sale-client">
            <h3>
              <Trans i18nKey="models.clients.title" />
            </h3>
            <div className="sale-client-content row">
              <ItemAttribute
                attribute="clientFirstname"
                key="clientFirstname"
                value={client.firstname}
                type="text"
                model="sales"
              />

              <ItemAttribute
                attribute="clientLastname"
                key="clientLastname"
                value={client.lastname}
                type="text"
                model="sales"
              />
            </div>
          </div>
        )}
        {salePromotion && (
          <div className="sale-promotion">
            <h3>
              <Trans i18nKey="models.sales.salePromotion" />
            </h3>
            <div className="sale-promotion-content row">
              <ItemAttribute
                attribute="salePromotionAmount"
                key="salePromotionAmount"
                value={
                  salePromotion.type == "flat_discount"
                    ? formatPrice(salePromotion.amount)
                    : `${salePromotion.amount} %`
                }
                type="text"
                model="sales"
              />
            </div>
          </div>
        )}
        {totalPrice && (
          <div className="sale-total-price">
            <div className="sale-total-price-content row">
              <ItemAttribute
                attribute="totalPrice"
                key="totalPrice"
                value={formatPrice(totalPrice)}
                type="text"
                model="sales"
              />
            </div>
          </div>
        )}
        {renderSalePayments()}
        {renderSaleVariants()}
      </div>
    );
  };

  const selectedSale = saleData?.data;
  return (
    <>
      <h1 className="data-details-title">{selectedSale?.name}</h1>
      {selectedSale && renderSaleInfos()}
    </>
  )
}

export default Sale;
