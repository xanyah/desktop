import { dinero, toDecimal } from 'dinero.js'
import * as currencies from '@dinero.js/currencies'
import { ceil, isUndefined, upperCase } from 'lodash'

export const formatPrice = (amount?: number, currency?: string, symbol?: string) => {
  if (isUndefined(amount) || isUndefined(currency)) {
    return ''
  }

  return toDecimal(
    dinero({
      amount: ceil(amount),
      currency: currencies[upperCase(currency)],
    }),
    ({ value, currency }) => `${value} ${symbol || currency.code}`,
  )
}
