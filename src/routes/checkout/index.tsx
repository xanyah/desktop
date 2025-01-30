import { useCallback, useState } from 'react'
import swal from 'sweetalert'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import promotionTypes from '../../constants/promotion-types'
import { createSale, getVariantByBarcode } from '../../utils/api-helper'
import {
  formatPrice,
  getSaleVariantsTotal,
  getSaleTotal,
} from '../../utils/data-helper'
import {
  showErrorToast,
  showSuccessToast,
} from '../../utils/notification-helper'
import { useCurrentStore, usePaymentTypes } from '../../hooks'
import Checkbox from '../../components/checkbox'
import Modal from '../../components/modal'
import { Trans, useTranslation } from 'react-i18next'
import { InputText } from '@/components'

const Checkout = () => {
  const currentStore = useCurrentStore()
  const { data: paymentTypesData } = usePaymentTypes({
    storeId: currentStore?.id,
  })
  const [displayedModal, setDisplayedModal] = useState(false)
  const [hasPromotion, setHasPromotion] = useState(false)
  const [salePayments, setSalePayments] = useState<any[]>([])
  const [salePromotion, setSalePromotion] = useState<any>()
  const [saleVariants, setSaleVariants] = useState<any[]>([])
  const [variantBarcode, setVariantBarcode] = useState('')
  const { t } = useTranslation()

  const resetSale = useCallback(() => {
    setDisplayedModal(false)
    setHasPromotion(false)
    setSalePayments([])
    setSalePromotion(undefined)
    setSaleVariants([])
    setVariantBarcode('')
  }, [])

  const onVariantSearch = useCallback(
    (e) => {
      e.preventDefault()

      getVariantByBarcode(variantBarcode)
        .then(({ data }) => {
          const variant = saleVariants.find((v) => v.variant.id === data.id)
          // If variant already exists, we just increment the quantity
          if (variant) {
            setSaleVariants(
              saleVariants.map((v) =>
                v.variant.id === data.id
                  ? { ...v, quantity: v.quantity + 1 }
                  : v
              )
            )
          } else {
            setSaleVariants([...saleVariants, { quantity: 1, variant: data }])
          }
          setVariantBarcode('')
        })
        .catch(() => {
          setVariantBarcode('')
          showErrorToast(
            t('toast.not-found', { entity: t('models.products.title') })
          )
        })
    },
    [saleVariants, variantBarcode, t]
  )

  const updateQuantity = useCallback((variantId, quantity) => {
    setSaleVariants((oldSaleVariants) =>
      oldSaleVariants.map((saleVariant) =>
        saleVariant.variant.id === variantId
          ? {
              ...saleVariant,
              quantity: quantity && quantity > 0 ? quantity : 0,
            }
          : saleVariant
      )
    )
  }, [])

  const removeVariant = useCallback((variantId) => {
    setSaleVariants((oldSaleVariants) =>
      oldSaleVariants.filter(
        (saleVariant) => saleVariant.variant.id !== variantId
      )
    )
  }, [])

  const addVariantPromotion = useCallback((variantId) => {
    setSaleVariants((oldSaleVariants) =>
      oldSaleVariants.map((saleVariant) =>
        saleVariant.variant.id === variantId
          ? {
              ...saleVariant,
              saleVariantPromotion: {
                amount: 0,
                type: promotionTypes[0],
              },
            }
          : saleVariant
      )
    )
  }, [])

  const getVariantsTotal = useCallback(() => {
    return getSaleVariantsTotal(saleVariants)
  }, [saleVariants])

  const getTotal = useCallback(() => {
    return getSaleTotal({ salePromotion, saleVariants })
  }, [saleVariants, salePromotion])

  const validateSale = useCallback(() => {
    createSale({
      salePayments: salePayments.map((salePayment) => ({
        paymentTypeId: salePayment.paymentType.id,
        total: salePayment.total,
      })),
      salePromotion: salePromotion?.type
        ? {
            amountCents: salePromotion.amountCents,
            type: salePromotion.type.key,
          }
        : null,
      saleVariants: saleVariants.map((saleVariant) => ({
        quantity: saleVariant.quantity,
        saleVariantPromotion: saleVariant.saleVariantPromotion
          ? {
              amount: saleVariant.saleVariantPromotion.amount,
              type: saleVariant.saleVariantPromotion.type.key,
            }
          : null,
        unitPrice: saleVariant.variant.price,
        variantId: saleVariant.variant.id,
      })),
      storeId: currentStore?.id,
      totalPrice: getTotal(),
    }).then(() => {
      resetSale()
      showSuccessToast(t('toast.created', { entity: t('models.sales.title') }))
    })
  }, [
    t,
    currentStore,
    getTotal,
    resetSale,
    salePayments,
    salePromotion,
    saleVariants,
  ])

  const renderVariant = useCallback(
    ({
      saleVariantPromotion,
      quantity,
      variant: { id, product, provider, price },
    }) => {
      return (
        <div className="sale-variant" key={id}>
          <div className="variant-infos">
            <h5>{product.name}</h5>
            <ul>
              <li>
                <b>{t('models.manufacturers.title')}:</b>{' '}
                {product.manufacturer.name}
              </li>
              <li>
                <b>{t('models.providers.title')}:</b> {provider.name}
              </li>
              <li>
                <b>{t('models.variants.unitPrice')}:</b> {formatPrice(price)}
              </li>
            </ul>
          </div>
          <div className="variant-quantity">
            <button onClick={() => updateQuantity(id, quantity - 1)}>
              <i className="im im-minus" />
            </button>
            <InputText
              type="text"
              onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
              value={quantity}
            />
            <button onClick={() => updateQuantity(id, quantity + 1)}>
              <i className="im im-plus" />
            </button>
          </div>
          <div className="variant-price">
            <h5>
              {saleVariantPromotion
                ? formatPrice(
                    saleVariantPromotion.type.calculatePrice(
                      quantity * price,
                      saleVariantPromotion.amount || 0
                    )
                  )
                : formatPrice(quantity * price)}
            </h5>
            <div className="variant-options">
              {saleVariantPromotion ? (
                <div className="variant-discount">
                  <Select
                    isClearable={false}
                    value={saleVariantPromotion.type.key}
                    options={promotionTypes.map(({ key }) => ({
                      label: t(`promotion-types.${key}`),
                      value: key,
                    }))}
                    onChange={({ value }) =>
                      setSaleVariants(
                        saleVariants.map((saleVariant) =>
                          saleVariant.variant.id === id
                            ? {
                                ...saleVariant,
                                saleVariantPromotion: {
                                  ...saleVariant.saleVariantPromotion,
                                  type: promotionTypes.find(
                                    ({ key }) => key === value
                                  ),
                                },
                              }
                            : saleVariant
                        )
                      )
                    }
                  />
                  <InputText
                    type="number"
                    step="any"
                    value={saleVariantPromotion.amount}
                    onChange={(e) =>
                      setSaleVariants(
                        saleVariants.map((saleVariant) =>
                          saleVariant.variant.id === id
                            ? {
                                ...saleVariant,
                                saleVariantPromotion: {
                                  ...saleVariant.saleVariantPromotion,
                                  amount: parseInt(e.target.value, 10),
                                },
                              }
                            : saleVariant
                        )
                      )
                    }
                  />
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => addVariantPromotion(id)}
                >
                  {t('checkout.add-promotion')}
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => removeVariant(id)}
              >
                {t('checkout.remove-article')}
              </button>
            </div>
          </div>
        </div>
      )
    },
    [addVariantPromotion, removeVariant, saleVariants, updateQuantity, t]
  )

  const renderPaymentType = useCallback(
    (paymentType) => {
      const selectedSalePayment = salePayments.find(
        (salePayment) => salePayment.paymentType.id === paymentType.id
      )

      return (
        <li key={paymentType.id}>
          <Checkbox
            checked={!!selectedSalePayment}
            onChange={() =>
              selectedSalePayment
                ? setSalePayments(
                    salePayments.filter(
                      (salePayment) =>
                        salePayment.paymentType.id !== paymentType.id
                    )
                  )
                : setSalePayments([
                    ...salePayments,
                    {
                      paymentType,
                      total: salePayments.length < 1 ? getVariantsTotal() : 0,
                    },
                  ])
            }
          >
            {paymentType.name}
          </Checkbox>
          {selectedSalePayment && (
            <InputText
              type="number"
              step="any"
              value={selectedSalePayment.total}
              onChange={(e) =>
                setSalePayments(
                  salePayments.map((salePayment) =>
                    salePayment.paymentType.id === paymentType.id
                      ? {
                          paymentType,
                          total: e.target.value,
                        }
                      : salePayment
                  )
                )
              }
            />
          )}
        </li>
      )
    },
    [salePayments, getVariantsTotal]
  )

  const change =
    salePayments.reduce((a, b) => a + parseFloat(b.total), 0) -
    getVariantsTotal()
  return (
    <>
      <div className="checkout-page">
        <form onSubmit={(e) => onVariantSearch(e)}>
          <i className="im im-magnifier" />
          <InputText
            type="text"
            placeholder={`${t('checkout.type-barcode')}...`}
            onChange={(e) => setVariantBarcode(e.target.value)}
            value={variantBarcode}
          />
          <button type="submit" />
          <h3>{formatPrice(getVariantsTotal())}</h3>
        </form>
        <div className="sale-variants">
          {saleVariants.map((variant) => renderVariant(variant))}
        </div>
        {saleVariants.length > 0 && (
          <div className="buttons-container">
            <button
              className="btn btn-danger"
              onClick={() =>
                swal({
                  buttons: true,
                  dangerMode: true,
                  icon: 'warning',
                  text: t('checkout.reset-alert.text'),
                  title: t('checkout.reset-alert.title'),
                }).then((willDelete) => {
                  if (willDelete) {
                    resetSale()
                  }
                })
              }
            >
              <i className="im im-x-mark" />
              {t('global.reset')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setDisplayedModal(true)}
            >
              {t('checkout.end_sale')}
            </button>
          </div>
        )}
      </div>
      <Modal displayed={displayedModal}>
        <div className="checkout-modal">
          <Checkbox
            onChange={() => setHasPromotion(!hasPromotion)}
            checked={hasPromotion}
          >
            {t('checkout.add-promotion')}
          </Checkbox>
          {hasPromotion && (
            <div className="price-promotion">
              <Select
                clearable={false}
                value={salePromotion.type ? salePromotion.type.key : null}
                options={promotionTypes.map(({ key }) => ({
                  label: t(`promotion-types.${key}`),
                  value: key,
                }))}
                onChange={(props) =>
                  setSalePromotion(
                    props
                      ? {
                          ...salePromotion,
                          type: promotionTypes.find(
                            ({ key }) => key === props.value
                          ),
                        }
                      : {}
                  )
                }
              />
              {salePromotion.type && (
                <InputText
                  type="number"
                  step="any"
                  value={salePromotion.amount}
                  onChange={(e) =>
                    setSalePromotion({
                      ...salePromotion,
                      amount: parseInt(e.target.value, 10),
                    })
                  }
                />
              )}
            </div>
          )}
          <div className="price-title">
            <h1>{t('checkout.total')}</h1>
            <h2>{formatPrice(getTotal())}</h2>
          </div>
          {change < 0 && (
            <div className="price-title">
              <h3>{t('checkout.left-to-pay')}</h3>
              <h4>{formatPrice(-change)}</h4>
            </div>
          )}
          <div>
            <ul>
              {paymentTypesData?.data.map((paymentType) =>
                renderPaymentType(paymentType)
              )}
            </ul>
          </div>
          {change > 0 && (
            <div className="price-title">
              <h3>{t('checkout.change')}</h3>
              <h4>{formatPrice(change)}</h4>
            </div>
          )}
          <div className="payment-footer">
            <button
              className="btn btn-link"
              onClick={() => setDisplayedModal(false)}
            >
              {t('global.cancel')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => validateSale()}
              disabled={
                salePayments.reduce((a, b) => a + parseFloat(b.total), 0) <
                getVariantsTotal()
              }
            >
              {t('global.validate')}
            </button>
          </div>
        </div>
      </Modal>
      <div className="sales-history-link">
        <Link to="/sales">
          <i className="im im-history" />
          &nbsp;
          <span>
            <Trans i18nKey="models.sales.history" />
          </span>
        </Link>
      </div>
    </>
  )
}

export default Checkout
