type SaleVariantPromotion = {
  id: string
  type: string
  amountCents: number
  amountCurrency: string
}

type SaleProduct = {
  id: string,
  quantity: number
  amountCents: number
  amountCurrency: string
  product: Product
}

type SalePromotion = {
  id: string
  type: string
  amountCents: number
  amountCurrency: string
}

type PaymentType = {
  id: string
  name: string
  description: string
}

type SalePayment = {
  id: string
  totalAmountCents: number
  totalAmountCurrency: string
  paymentType?: PaymentType
}

type Sale = {
  id: string
  totalAmountCents: number
  totalAmountCurrency: string
  createdAt: string
  // client: Client
  store: Store
  user: User
  salePromotion?: SalePromotion
  salePayments: SalePayment[]
  saleVariants: SaleVariant[]
}
