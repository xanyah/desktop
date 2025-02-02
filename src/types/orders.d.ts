interface OrderProduct {
  id: string
  quantity: number
  product: Product
}

interface Order {
  id: string
  state: 'pending'
    | 'delivered'
    | 'ordered'
    | 'withdrawn'
    | 'cancelled'
  createdAt: string
  updatedAt: string
  deliveredAt: string | null
  orderedAt: string | null
  withdrawnAt: string | null
  cancelledAt: string | null
  customer: Customer
}
