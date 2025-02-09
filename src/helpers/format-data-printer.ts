import { DateTime } from 'luxon'
import { uuidNumber } from './uuid'

export const formatDataPrinter = (sale: Sale, products?: SaleProduct[]) => {
  const formattedDate = DateTime.fromISO(sale.createdAt).toFormat('dd/MM/yyyy')
  const data = [
    {
      type: 'text', value: 'Revland',
      style: { fontWeight: '700', textAlign: 'center', fontSize: '32px' },

    },
    {
      type: 'text', value: formattedDate,
      style: { textAlign: 'center', fontSize: '16px', margin: '14px 0 14px 0' },
    },
    {
      type: 'text', value: `Ticket N° ${uuidNumber(sale.id)}`,
      style: { textAlign: 'center', fontSize: '16px', margin: '14px 0 14px 0' },
    },

  ]

  console.log(products)

  return data
}
