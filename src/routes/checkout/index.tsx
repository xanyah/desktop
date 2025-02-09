import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { FormProvider, useForm } from 'react-hook-form'
import { checkoutSchema, CheckoutSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import ProductSearch from './product-search'
import Products from './products'
import Price from './price'
import { Button, FormContainer, FormSection } from '@/components'
import Payment from './payment'
import { useCallback, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSale } from '@/api'
import { useNavigate } from 'react-router-dom'
import { useCurrentStore } from '@/hooks'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

const Checkout = () => {
  const { t } = useTranslation()
  const store = useCurrentStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  useBreadCrumbContext([{ label: t('checkout.pageTitle') }])
  const form = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  })
  const toastId = useRef<string>(null)

  const { mutate } = useMutation({
    mutationFn: createSale,
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      navigate(`/sales/${data.data.id}`)
    },
    onError: () => {
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const onSubmit = useCallback(
    (data: CheckoutSchemaType) => {
      mutate({ ...data, storeId: store?.id })
    },
    [mutate, store],
  )

  return (
    <FormProvider {...form}>
      <FormContainer
        title={t('checkout.pageTitle')}
        subtitle={t('checkout.pageSubtitle')}
        isNotForm
      >
        <FormSection title={t('checkout.products')}>
          <ProductSearch />
          <Products />
        </FormSection>
        <FormSection title={t('checkout.price')}>
          <Price />
        </FormSection>
        <FormSection title={t('checkout.payment')}>
          <Payment />
        </FormSection>
        <Button className="self-end" onClick={form.handleSubmit(onSubmit)}>
          {t('checkout.validateButton')}
        </Button>
      </FormContainer>
    </FormProvider>
  )
}

export default Checkout
