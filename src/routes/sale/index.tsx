import {
  useCurrentStore,
  usePrint,
  useSale,
  useSaleProducts,
} from '../../hooks'
import { useParams } from 'react-router-dom'
import { uuidNumber } from '@/helpers/uuid'
import { Button, ShowContainer, ShowSection } from '@/components'
import SaleProducts from './products'
import SaleInfos from './infos'
import { formatLongDatetime } from '@/helpers/dates'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'
import { Barcode, ReceiptText } from 'lucide-react'
import { formatDataPrinterInvoice, formatDataPrinterReceipt } from '@/helpers'
import { PosPrintData } from 'electron-pos-printer'

const Sale = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data: saleData } = useSale(id)

  const { data: saleProductsData } = useSaleProducts({
    'q[saleIdEq]': saleData?.data?.id,
  })

  const store = useCurrentStore()

  useBreadCrumbContext([
    { label: t('sales.pageTitle'), url: '/sales' },
    {
      label: t('sale.pageTitle', { saleNumber: uuidNumber(saleData?.data.id) }),
    },
  ])

  const { mutate: print } = usePrint()

  const onPrintReceipt = () => {
    if (saleData && saleProductsData && store) {
      print(
        formatDataPrinterReceipt(
          saleData.data,
          saleProductsData?.data,
          store,
        ) as PosPrintData[],
      )
    }
  }

  const onPrintInvoice = () => {
    if (saleData && saleProductsData) {
      print(
        formatDataPrinterInvoice(
          saleData.data,
          saleProductsData?.data,
        ) as PosPrintData[],
      )
    }
  }

  if (!saleData) {
    return null
  }

  return (
    <ShowContainer
      title={t('sale.pageTitle', { saleNumber: uuidNumber(saleData?.data.id) })}
      subtitle={t('sale.pageSubtitle', {
        saleDate: formatLongDatetime(saleData?.data.createdAt),
      })}
      button={(
        <div className="flex gap-2 items-center">
          <Button variant="outline" type="button" onClick={onPrintReceipt}>
            <Barcode />
            {t('sale.printReceipt')}
          </Button>
          <Button type="button" onClick={onPrintInvoice}>
            <ReceiptText />
            {t('sale.printInvoice')}
          </Button>
        </div>
      )}
    >
      <ShowSection title={t('sale.generalInformations')}>
        <SaleInfos sale={saleData?.data} />
      </ShowSection>

      <ShowSection title={t('sale.products')}>
        <SaleProducts saleProductsData={saleProductsData?.data} />
      </ShowSection>
    </ShowContainer>
  )
}

export default Sale
