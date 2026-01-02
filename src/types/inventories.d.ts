interface InventoryProduct {
  id: string
  quantity: number
  createdAt: string
  updatedAt: string
  product: Product
}

type InventoryStatus = 'pending' | 'updating_stock' | 'errored' | 'success'

interface Inventory {
  id: string
  status: InventoryStatus
  lockedAt: string
  createdAt: string
  updatedAt: string
}
