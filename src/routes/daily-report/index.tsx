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

  const totalPayments = useMemo(() => map(paymentTypes?.data, (paymentType) => {
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
  }), [paymentTypes, salesPayments])

  const totalAmountCents = useMemo(() => sumBy(totalPayments, 'totalAmountCents'), [totalPayments])

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
          <div className="w-1/2 flex flex-col gap-2">
            <h1>{currentStore?.name}</h1>
            <h3>{date.toFormat('dd/MM/yyyy')}</h3>
          </div>
          <div className="flex flex-col gap-2 w-1/2 print:text-sm print:gap-1">
            {map(totalPayments, totalPayment => (
              <div className="flex justify-between" key={totalPayment.name}>
                <p className="text-slate-600">{totalPayment?.name}</p>
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
                  totalAmountCents,
                  'EUR',
                  '€',
                )}
              </p>
            </div>
          </div>
        </div>
      </FormContainer>

      <FormContainer
        isNotForm
        title={t('dailyReport.sales')}
      >
        <div className="flex flex-col gap-4 items-stretch print:gap-2">
          {isEmpty(sales?.data)
            ? (
                <p className="text-center">{t('dailyReport.emptySales')}</p>
              )
            : (
                map(sales?.data, sale => (
                  <div className="flex flex-row items-center gap-2 print:gap-1" key={sale.id}>
                    <h4 className="font-semibold flex-1 print:text-sm">
                      {t('print.receipt.receiptNumber', {
                        receiptNumber: uuidNumber(sale.id),
                      })}
                    </h4>
                    <div className="flex flex-col gap-2 print:gap-1 print:text-xs">
                      {map(
                        filter(
                          salesPayments?.data,
                          salesPayment => salesPayment.saleId === sale.id,
                        ),
                        payment => (
                          <div className="flex flex-row justify-between gap-4 print:text-xs" key={payment.id}>
                            <p>{payment.paymentType?.name}</p>

                            <p>
                              {formatPrice(
                                payment.totalAmountCents,
                                payment.totalAmountCurrency,
                                '€',
                              )}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))
              )}
        </div>
      </FormContainer>
    </div>
  )
}

export default DailyReport
