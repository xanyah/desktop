import { Button, CustomerPanelForm, ShowAttribute } from '@/components'
import { customerFullname } from '@/helpers/customer'
import { formatPrice } from '@/helpers/price'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { customerSaleSchema, customerSaleSchemaType } from './config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface SaleInfosProps {
  sale: Sale
}

const SaleInfos = ({ sale }: SaleInfosProps) => {
  const { t } = useTranslation()
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const { control, setValue, handleSubmit } = useForm<customerSaleSchemaType>({
    resolver: zodResolver(customerSaleSchema),
    defaultValues: { customerId: '' },
  })

  const onSaveCustomer = (data: customerSaleSchemaType) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-row justify-between">
        <ShowAttribute label={t('sale.user')}>
          {customerFullname(sale.user)}
        </ShowAttribute>
        <ShowAttribute label={t('sale.amount')}>
          {formatPrice(sale.totalAmountCents, sale.totalAmountCurrency)}
        </ShowAttribute>
      </div>
      {sale.customer ? (
        <ShowAttribute label={t('sale.customer')}>
          <Link
            className="underline"
            to={`/customers/${sale.customer.id}/edit`}
          >
            {customerFullname(sale.customer)}
          </Link>
        </ShowAttribute>
      ) : (
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSaveCustomer)}
        >
          <CustomerPanelForm
            onSuccess={data => {
              setValue('customerId', data.id)
              setIsPanelOpen(false)
            }}
            name="customerId"
            control={control}
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
          <Button className="self-end" type="submit">
            {t('global.save')}
          </Button>
        </form>
      )}
    </div>
  )
}

export default SaleInfos
