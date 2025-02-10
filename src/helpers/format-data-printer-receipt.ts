import { DateTime } from 'luxon'
import { uuidNumber } from './uuid'
import { map } from 'lodash'
import { formatPrice } from './price'

export const formatDataPrinterReceipt = (sale: Sale, saleProducts: SaleProduct[], store: Store) => {
  const formattedDate = DateTime.fromISO(sale.createdAt).toFormat('dd/MM/yyyy')

  const prodcutTableBody = map(saleProducts, saleProduct => [
    {
      type: 'text',
      value: saleProduct.quantity,
      style: { fontWeight: '500', width: '10%', textAlign: 'left', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: saleProduct.product.name,
      style: { fontWeight: '500', width: '65%', textAlign: 'left', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: formatPrice(saleProduct.amountCents, saleProduct.amountCurrency, '€'),
      style: { fontWeight: '500', width: '25%', textAlign: 'right', fontFamily: 'sans-serif' },
    },
  ])

  const data = [
    {
      type: 'text',
      value: 'Revland',
      style: { fontWeight: '700', textAlign: 'center', fontSize: '32px', fontFamily: 'sans-serif' },

    },
    {
      type: 'text',
      value: formattedDate,
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: `Ticket N° ${uuidNumber(sale.id)}`,
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: store.phoneNumber,
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: store.emailAddress,
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: store.websiteUrl,
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 40px 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'table',
      // style the table
      style: { borderBottom: '1px solid #ddd' },
      // list of the columns to be rendered in the table header
      tableHeader: [
        {
          type: 'text',
          value: 'Qte',
          style: { fontWeight: '700', width: '10%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
        {
          type: 'text',
          value: 'Désignation',
          style: { fontWeight: '700', width: '65%', textAlign: 'left', fontFamily: 'sans-serif' },
        },

        {
          type: 'text',
          value: 'Prix',
          style: { fontWeight: '700', width: '25%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
      ],
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: prodcutTableBody,
      // list of columns to be rendered in the table footer
      tableFooter: [],
      // custom style for the table header
      tableHeaderStyle: { fontWeight: '700' },
      // custom style for the table body
      tableBodyStyle: {},
      // custom style for the table footer
      tableFooterStyle: {},
    },

    {
      type: 'text',
      value: `Total TTC: ${formatPrice(sale.totalAmountCents, sale.totalAmountCurrency, '€')}`,
      style: { fontWeight: '700', textAlign: 'right', margin: '32px 0 0 0', fontFamily: 'sans-serif' },
    },
  ]

  return data
}
