type OrderVariant = {
  id: string
  quantity: number
  variant: Variant
}

type Order = {
  id: string
  status: 'pending' | 'delivered' | 'cancelled'
  createdAt: string
  // client: Client
  orderVariants: OrderVariant[]
}
