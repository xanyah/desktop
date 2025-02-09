interface Store {
  address1: string
  address2: string
  zipcode: string
  city: string
  websiteUrl: string
  phoneNumber: string
  emailAddress: string
  color: string
  country: Country
  id: string
  key: string
  name: string
}

interface StoreMembership {
  createdAt: string
  id: string
  role: 'admin' | 'owner' | 'regular'
  storeId: string
  updatedAt: string
  userId: string
}
