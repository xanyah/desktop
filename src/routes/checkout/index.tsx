import { useBreadCrumbContext } from "@/contexts/breadcrumb"
import { FormProvider, useForm } from "react-hook-form"
import { checkoutSchema, CheckoutSchemaType } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import ProductSearch from "./product-search"
import Products from "./products"
import Price from "./price"
import { Button, FormContainer, FormSection } from "@/components"
import Payment from "./payment"
import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSale } from "@/api"
import { useNavigate } from "react-router-dom"
import { useCurrentStore } from "@/hooks"

const Checkout = () => {
  const store = useCurrentStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  useBreadCrumbContext([{ label: 'Encaissement' }])
  const form = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema)
  })

  const {mutate} = useMutation({
    mutationFn: createSale,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['sales']})
      navigate(`/sales/${data.data.id}`)
    }
  })

  const onSubmit = useCallback((data: CheckoutSchemaType) => {
    mutate({...data, storeId: store?.id})
  }, [mutate, store])

  return (
    <FormProvider {...form}>
      <FormContainer
        title="Encaissement"
        subtitle="Saisissez ici les données de votre encaissement"
        isNotForm
      >
        <FormSection title="Produits">
          <ProductSearch />
          <Products />
        </FormSection>
        <FormSection title="Total & Remises">
          <Price />
        </FormSection>
        <FormSection title="Paiement">
          <Payment />
        </FormSection>
        <Button className="self-end" onClick={form.handleSubmit(onSubmit)}>
          Valider la vente
        </Button>
      </FormContainer>
    </FormProvider>)
}

export default Checkout
