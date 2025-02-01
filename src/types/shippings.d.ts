type Shipping = {
  id: string
  state: 'pending' | 'validated' | 'cancelled'
  validatedAt: string
  cancelledAt: string
  createdAt: string
  updatedAt: string
  provider: Provider
}

type ShippingProduct = {
  id: string
  quantity: number
  createdAt: string
  updatedAt: string
  product: Product
  shipping: Shipping
}
