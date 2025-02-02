interface Store {
  address: string
  country: Country
  id: string
  key: string
  name: string
  notes: string
}

interface StoreMembership {
  createdAt: string
  id: string
  role: 'admin' | 'owner' | 'regular'
  storeId: string
  updatedAt: string
  userId: string
}
