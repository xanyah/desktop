import { useMemo } from 'react'
import { useCustomer } from '../../hooks'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CustomerForm } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { AxiosResponse } from 'axios'

type CustomerFormProps = {
  onCancel?: () => void
  onSuccess?: (data: AxiosResponse<Customer, any>) => void
  isPanelForm?: boolean
}

const Customer = ({ isPanelForm, onCancel, onSuccess }: CustomerFormProps) => {
  const { t } = useTranslation()
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
      onCancel={onCancel}
      isPanelForm={isPanelForm}
      onSuccess={(data) => {
        onSuccess?.(data)
      }}
    />
  )
}

export default Customer
