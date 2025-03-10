import { useMemo, useState } from 'react'
import {
  useCurrentStore,
  usePaymentTypes,
  useSalePayments,
  useSales,
} from '../../hooks'

import { useTranslation } from 'react-i18next'

import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { DateTime } from 'luxon'
import { chain, filter, find, groupBy, isEmpty, map, sumBy } from 'lodash'
import { Button, FormContainer } from '@/components'
import { uuidNumber } from '@/helpers/uuid'
import { formatPrice } from '@/helpers/price'

const DailyReport = () => {
  const { t } = useTranslation()
  const [date, setDate] = useState(DateTime.now())
  const currentStore = useCurrentStore()

  const pageTitle = useMemo(() => t('dailyReport.pageTitle'), [t])
  useBreadCrumbContext([{ label: pageTitle }])

  const { data: sales } = useSales({
    'q[createdAtGt]': date.startOf('day').toISO(),
    'q[createdAtLt]': date.endOf('day').toISO(),
    'q[storeIdEq]': currentStore?.id,
  })

  const saleIds = useMemo(
    () => map(sales?.data, sale => sale.id) || [],
    [sales],
  )

  const { data: salesPayments } = useSalePayments(
    {
      'q[sale_id_in][]': saleIds,
    },
    !isEmpty(saleIds),
  )

  const { data: paymentTypes } = usePaymentTypes({
    'q[s]': 'name',
    'q[storeIdEq]': currentStore?.id,
  })

  const totalPayments = map(paymentTypes?.data, paymentType => {
    const foundPayments = filter(
      salesPayments?.data,
      item => item?.paymentType?.id === paymentType.id,
    )

    return {
      name: paymentType.name,
      totalAmountCents: !isEmpty(foundPayments)
        ? sumBy(foundPayments, 'totalAmountCents')
        : 0,
      currency: !isEmpty(foundPayments)
        ? foundPayments[0].totalAmountCurrency
        : undefined,
    }
  })

  return (
    <div className="flex gap-20 w-full">
      <FormContainer
        button={
          <div className="flex gap-2 items-center">
            <Button variant="outline">{t('sale.printReceipt')}</Button>
            <Button type="button">{t('sale.printInvoice')}</Button>
          </div>
        }
        classname="w-full"
        isNotForm
        title={`${pageTitle}: ${date.toFormat('dd/MM/yyyy')}`}
      >
        {map(sales?.data, sale => (
          <div>
            <h4 className="font-semibold">
              {t('print.receipt.receiptNumber', {
                receiptNumber: uuidNumber(sale.id),
              })}
            </h4>
            {map(
              filter(
                salesPayments?.data,
                salesPayment => salesPayment.saleId === sale.id,
              ),
              payment => (
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex justify-between">
                    <p>{payment.paymentType?.name}</p>

                    <p>
                      {formatPrice(
                        payment.totalAmountCents,
                        payment.totalAmountCurrency,
                        '€',
                      )}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        ))}
      </FormContainer>

      <FormContainer classname="w-full" isNotForm title="Moyens de paiements">
        {map(totalPayments, totalPayment => (
          <div className="flex justify-between">
            <p>{totalPayment?.name}</p>
            <p>
              {formatPrice(
                totalPayment.totalAmountCents,
                totalPayment.currency,
                '€',
              )}
            </p>
          </div>
        ))}

        <div className="flex justify-between">
          <h4 className="font-semibold">Total TTC</h4>
          <p className="font-semibold">
            {formatPrice(
              sumBy(totalPayments, 'totalAmountCents'),
              totalPayments[0]?.currency,
              '€',
            )}
          </p>
        </div>
      </FormContainer>
    </div>
  )
}

export default DailyReport
