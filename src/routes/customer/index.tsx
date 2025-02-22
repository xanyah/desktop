import { useMemo } from 'react'
import { useCustomer } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CustomerForm } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Customer = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: customerData } = useCustomer(id)

  const pageTitle = useMemo(
    () =>
      customerData?.data
        ? `${customerData?.data.firstname} ${customerData?.data.lastname}`
        : t('customer.newPageTitle'),
    [t, customerData],
  )

  useBreadCrumbContext([
    { label: t('customers.pageTitle'), url: '/customers' },
    { label: pageTitle },
  ])

  return (
    <CustomerForm
      onSuccess={data => navigate(`/customers/${data.data.id}/edit`)}
    />
  )
}

export default Customer
