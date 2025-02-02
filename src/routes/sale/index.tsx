import { useSale } from '../../hooks'
import { useParams } from 'react-router-dom'
import { uuidNumber } from '@/helpers/uuid'
import { ShowContainer, ShowSection } from '@/components'
import SaleProducts from './products'
import SaleInfos from './infos'
import { formatLongDatetime } from '@/helpers/dates'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Sale = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data: saleData } = useSale(id)
  useBreadCrumbContext([
    { label: t('sales.pageTitle'), url: '/sales' },
    { label: t('sale.pageTitle', { saleNumber: uuidNumber(saleData?.data.id) }) },
  ])
  if (!saleData) {
    return null
  }
  return (
    <ShowContainer
      title={t('sale.pageTitle', { saleNumber: uuidNumber(saleData?.data.id) })}
      subtitle={t('sale.pageSubtitle', { saleDate: formatLongDatetime(saleData?.data.createdAt) })}
    >
      <ShowSection title={t('sale.generalInformations')}>
        <SaleInfos sale={saleData?.data} />
      </ShowSection>

      <ShowSection title={t('sale.products')}>
        <SaleProducts sale={saleData?.data} />
      </ShowSection>
    </ShowContainer>
  )
}

export default Sale
