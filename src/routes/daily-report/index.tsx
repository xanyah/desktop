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
import { filter, isEmpty, map, sumBy } from 'lodash'
import { Button, DatePicker, FormContainer } from '@/components'
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

  const totalPayments = map(paymentTypes?.data, (paymentType) => {
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
    <div className="flex flex-col gap-10">
      <FormContainer
        button={(
          <div className="flex justify-between w-full gap-2 items-center print:hidden">
            <DatePicker
              value={date.toJSDate()}
              onChange={v =>
                setDate(DateTime.fromJSDate(v) as DateTime<true>)}
            />
            <Button onClick={() => window.electronAPI.printWindow()}>
              {t('dailyReport.print')}
            </Button>
          </div>
        )}
        classname="w-full"
        title={t('dailyReport.pageTitle')}
        isNotForm
      >
        <div className="flex gap-14">
          <div className="w-1/2">
            <h1>{currentStore?.name}</h1>
            <h3 className="mt-3.5">{date.toFormat('dd/MM/yyyy')}</h3>
          </div>
          <div className="flex flex-col gap-6 w-1/2">
            {map(totalPayments, totalPayment => (
              <div className="flex justify-between" key={totalPayment.name}>
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
              <h4 className="font-semibold">{t('dailyReport.total')}</h4>
              <p className="font-semibold">
                {formatPrice(
                  sumBy(totalPayments, 'totalAmountCents'),
                  totalPayments[0]?.currency,
                  '€',
                )}
              </p>
            </div>
          </div>
        </div>
      </FormContainer>

      <FormContainer
        classname="w-full"
        isNotForm
        title={t('dailyReport.sales')}
      >
        {isEmpty(sales?.data)
          ? (
              <p className="text-center">{t('dailyReport.emptySales')}</p>
            )
          : (
              map(sales?.data, sale => (
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
                      <div className="flex flex-col mt-5">
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
              ))
            )}
      </FormContainer>
    </div>
  )
}

export default DailyReport
