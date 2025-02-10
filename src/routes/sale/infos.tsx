import {
  Button,
  CustomerPanelForm,
  FormSection,
  ShowAttribute,
} from '@/components'
import { customerFullname } from '@/helpers/customer'
import { formatPrice } from '@/helpers/price'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { customerSaleSchema, customerSaleSchemaType } from './config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSale } from '@/api'
import toast from 'react-hot-toast'

interface SaleInfosProps {
  sale: Sale
}

const SaleInfos = ({ sale }: SaleInfosProps) => {
  const { t } = useTranslation()
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const toastId = useRef<string>(null)
  const queryClient = useQueryClient()

  const { control, setValue, handleSubmit } = useForm<customerSaleSchemaType>({
    resolver: zodResolver(customerSaleSchema),
    defaultValues: { customerId: '' },
  })

  const { mutate } = useMutation({
    mutationFn: (params: { customerId: string }) => updateSale(sale.id, params),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      queryClient.invalidateQueries({ queryKey: ['sales'] })
    },
    onError: () => {
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const onSaveCustomer = (data: customerSaleSchemaType) => {
    mutate(data)
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
      {sale.customer
        ? (
            <ShowAttribute label={t('sale.customer')}>
              <Link
                className="underline"
                to={`/customers/${sale.customer.id}/edit`}
              >
                {customerFullname(sale.customer)}
              </Link>
            </ShowAttribute>
          )
        : (
            <FormSection title={t('sale.customer')}>
              <div className="flex flex-col gap-8">
                <CustomerPanelForm
                  onSuccess={(data) => {
                    setValue('customerId', data.id)
                    setIsPanelOpen(false)
                  }}
                  name="customerId"
                  control={control}
                  isPanelOpen={isPanelOpen}
                  setIsPanelOpen={setIsPanelOpen}
                />
                <Button className="self-end" onClick={handleSubmit(onSaveCustomer)}>
                  {t('global.save')}
                </Button>
              </div>
            </FormSection>
          )}
    </div>
  )
}

export default SaleInfos
