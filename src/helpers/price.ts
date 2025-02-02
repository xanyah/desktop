import { dinero, toDecimal } from 'dinero.js'
import * as currencies from '@dinero.js/currencies'
import { isUndefined, upperCase } from 'lodash'

export const formatPrice = (amount?: number, currency?: string) => {
  if (isUndefined(amount) || isUndefined(currency)) {
    return ''
  }

  return toDecimal(dinero({ amount, currency: currencies[upperCase(currency)] }), ({ value, currency }) => `${value} ${currency.code}`)
}
