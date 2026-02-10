interface Shipping {
  id: string
  state: 'pending' | 'validated' | 'cancelled'
  validatedAt: string
  cancelledAt: string
  createdAt: string
  updatedAt: string
  provider: Provider
}

interface ShippingProduct {
  id: string
  quantity: number
  newBuyingAmountCents?: number
  newBuyingAmountCurrency?: string
  newSellingAmountCents?: number
  newSellingAmountCurrency?: string
  createdAt: string
  updatedAt: string
  product: Product
  shipping: Shipping
}
