import { DateTime } from 'luxon'
import { uuidNumber } from './uuid'
import { map } from 'lodash'
import { formatPrice } from './price'
import { PosPrintData, PosPrintTableField } from 'electron-pos-printer'
import { TFunction } from 'i18next'

export const formatDataPrinterReceipt = (
  sale: Sale,
  saleProducts: SaleProduct[],
  store: Store,
  t: TFunction<'translation', undefined>,
): PosPrintData[] => {
  const formattedDate = DateTime.fromISO(sale.createdAt).toFormat('dd/MM/yyyy')

  const productTableBody: PosPrintTableField[][] = map(saleProducts, saleProduct => [
    {
      type: 'text' as const,
      value: saleProduct.quantity.toString(),
      style: { fontWeight: '500', width: '10%', textAlign: 'left', fontFamily: 'sans-serif' },
    },
    {
      type: 'text' as const,
      value: saleProduct.product.name,
      style: { fontWeight: '500', width: '65%', textAlign: 'left', fontFamily: 'sans-serif' },
    },
    {
      type: 'text' as const,
      value: formatPrice(saleProduct.amountCents, saleProduct.amountCurrency, '€'),
      style: { fontWeight: '500', width: '25%', textAlign: 'right', fontFamily: 'sans-serif' },
    },
  ])

  return [
    {
      type: 'text',
      value: store.name,
      style: { fontWeight: '700', textAlign: 'center', fontSize: '32px', fontFamily: 'sans-serif' },

    },
    {
      type: 'text',
      value: formattedDate,
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: t('print.receipt.receiptNumber', { receiptNumber: uuidNumber(sale.id) }),
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
          value: t('print.receipt.quantity'),
          style: { fontWeight: '700', width: '10%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
        {
          type: 'text',
          value: t('print.receipt.productName'),
          style: { fontWeight: '700', width: '65%', textAlign: 'left', fontFamily: 'sans-serif' },
        },

        {
          type: 'text',
          value: t('print.receipt.price'),
          style: { fontWeight: '700', width: '25%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
      ],
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: productTableBody,
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
      value: t('print.receipt.totalAmount', { amount: formatPrice(sale.totalAmountCents, sale.totalAmountCurrency, '€') }),
      style: { fontWeight: '700', textAlign: 'right', margin: '32px 0 0 0', fontFamily: 'sans-serif' },
    },
  ]
}
