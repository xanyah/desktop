interface SaleVariantPromotion {
  id: string
  type: string
  amountCents: number
  amountCurrency: string
}

interface SaleProduct {
  id: string
  quantity: number
  amountCents: number
  amountCurrency: string
  product?: Product
  customLabel?: string
}

interface SalePromotion {
  id: string
  type: string
  amountCents: number
  amountCurrency: string
}

interface PaymentType {
  id: string
  name: string
  description: string
  isRefund: boolean
}

interface SalePayment {
  id: string
  saleId: string
  totalAmountCents: number
  totalAmountCurrency: string
  paymentType?: PaymentType
}

interface Sale {
  id: string
  totalAmountCents: number
  totalAmountCurrency: string
  createdAt: string
  // client: Client
  customer: Customer
  store: Store
  user: User
  salePromotion?: SalePromotion
  salePayments: SalePayment[]
  saleVariants: SaleVariant[]
}
