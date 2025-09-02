import { dinero, toDecimal } from 'dinero.js'
import * as currencies from '@dinero.js/currencies'
import { ceil, isEmpty, isNumber, isUndefined, toNumber, upperCase } from 'lodash'
import { ChangeEvent } from 'react'

export const formatPrice = (amount?: number, currency?: string, symbol?: string) => {
  if (isUndefined(amount) || isUndefined(currency)) {
    return `0.00 ${symbol || ''}`
  }

  return toDecimal(
    dinero({
      amount: ceil(amount),
      currency: currencies[upperCase(currency)],
    }),
    ({ value, currency }) => `${value} ${symbol || currency.code}`,
  )
}

export const formatPriceCentsInput = (e: ChangeEvent<HTMLInputElement>) => {
  if (isEmpty(e.target.value)) {
    return null
  }

  return toNumber(e.target.value) * 100
}

export const formatPriceCentsInputValue = (value: number | undefined | null) => {
  if (isNumber(value)) {
    return value / 100
  }

  return ''
}

export const formatNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
  if (isEmpty(e.target.value)) {
    return null
  }

  return toNumber(e.target.value)
}
