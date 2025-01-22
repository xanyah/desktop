type Shipping = {
  id: string
  shippingVariantsCount: number
  lockedAt: string
  createdAt: string
  updatedAt: string
  provider: Provider
}

type ShippingVariant = {
  id: string
  quantity: number
  createdAt: string
  updatedAt: string
  variant: Variant
  shipping: Shipping
}
