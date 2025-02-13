import { PosPrintData, PosPrintTableField } from 'electron-pos-printer'
import { uuidNumber } from './uuid'
import { formatPrice } from './price'
import { DateTime } from 'luxon'
import { TFunction } from 'i18next'
import { map, reduce } from 'lodash'
import { customerFullname } from './customer'

export const formatDataPrinterInvoice = (
  sale: Sale,
  saleProducts: SaleProduct[],
  store: Store,
  t: TFunction<'translation', undefined>,
): PosPrintData[] => {
  const formattedDate = DateTime.fromISO(sale.createdAt).toFormat('dd/MM/yyyy')
  const totalHT = reduce(saleProducts, (sum, item) => {
    return sum + (item.quantity * item.product.taxFreeAmountCents)
  }, 0)

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

  const customerFields: PosPrintData[] = sale.customer
    ? [
        {
          type: 'text',
          value: customerFullname(sale.customer),
          style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
        },
        {
          type: 'text',
          value: sale.customer.address,
          style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 40px 0', fontFamily: 'sans-serif' },
        },
      ]
    : []

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
      value: t('print.invoice.invoiceNumber', { invoiceNumber: uuidNumber(sale.id) }),
      style: { fontWeight: '500', textAlign: 'center', fontSize: '16px', margin: '12px 0 12px 0', fontFamily: 'sans-serif' },
    },
    ...customerFields,
    {
      type: 'table',
      style: { borderBottom: '1px solid #ddd' },
      tableHeader: [
        {
          type: 'text',
          value: t('print.invoice.quantity'),
          style: { fontWeight: '700', width: '10%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
        {
          type: 'text',
          value: t('print.invoice.productName'),
          style: { fontWeight: '700', width: '65%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
        {
          type: 'text',
          value: t('print.invoice.price'),
          style: { fontWeight: '700', width: '25%', textAlign: 'left', fontFamily: 'sans-serif' },
        },
      ],
      tableBody: productTableBody,
      tableFooter: [],
      tableHeaderStyle: { fontWeight: '700' },
      tableBodyStyle: {},
      tableFooterStyle: {},
    },
    {
      type: 'text',
      value: t('print.invoice.taxFreeAmount', { amount: formatPrice(totalHT, sale.totalAmountCurrency, '€') }),
      style: { fontWeight: '700', textAlign: 'right', margin: '32px 0 0 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: t('print.invoice.vatAmount', { amount: formatPrice(sale.totalAmountCents - totalHT, sale.totalAmountCurrency, '€') }),
      style: { fontWeight: '700', textAlign: 'right', margin: '14px 0 0 0', fontFamily: 'sans-serif' },
    },
    {
      type: 'text',
      value: t('print.invoice.totalAmount', { amount: formatPrice(sale.totalAmountCents, sale.totalAmountCurrency, '€') }),
      style: { fontWeight: '700', textAlign: 'right', margin: '14px 0 0 0', fontFamily: 'sans-serif' },
    },
  ]
}
