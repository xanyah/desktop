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
import { ReceiptText } from 'lucide-react'
import { formatDataPrinter } from '@/helpers/format-data-printer'
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

  const onPrint = () => {
    if (saleData && saleProductsData && store) {
      print(
        formatDataPrinter(
          saleData.data,
          saleProductsData?.data,
          store,
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
        <Button type="button" onClick={onPrint}>
          <ReceiptText />
          {t('sale.printReceipt')}
        </Button>
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
