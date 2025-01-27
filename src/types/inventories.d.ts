type InventoryProduct = {
  id: string
  quantity: number
  createdAt: string
  updatedAt: string
  product: Product
}

type Inventory = {
  id: string
  lockedAt: string
  createdAt: string
  updatedAt: string
}
