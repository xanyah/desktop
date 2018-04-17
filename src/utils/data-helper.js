import React from 'react'

import moment from 'moment'

export const formatData = (data, column) => {
  if(isOfDateType(column)) {
    return moment(data).isValid()
      ? moment(data).format('llll')
      : data
  } else {
    return data
  }
}

export const formatPrice = price => `${(price || 0).toFixed(2)} €`

export const isOfDateType = attribute =>
  [
    'createdAt',
    'updatedAt',
    'lockedAt',
  ].includes(attribute)


export const getFormElement = (item) => {
  switch(item.type) {
  case 'textarea':
    return (
      <textarea
        onChange={e =>item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}>
      </textarea>
    )
  case 'number':
    return (
      <input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="number"
      />
    )
  case 'string':
    return (
      <input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="text"
      />
    )
  }
}

export const getSaleVariantsTotal = saleVariants =>
  saleVariants.reduce((a, b) =>
    b.saleVariantPromotion
      ? a + (b.saleVariantPromotion.type.calculatePrice(b.quantity * b.variant.price, b.saleVariantPromotion.amount || 0))
      : a + (b.quantity * b.variant.price), 0)

export const getSaleTotal = sale =>
  sale.salePromotion.type
    ? sale.salePromotion.type.calculatePrice(getSaleVariantsTotal(sale.saleVariants), sale.salePromotion.amount || 0)
    : getSaleVariantsTotal(sale.saleVariants)

