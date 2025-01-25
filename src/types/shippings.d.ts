type Shipping = {
  id: string
  shippingProductsCount: number
  lockedAt: string
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
