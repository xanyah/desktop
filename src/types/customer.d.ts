interface Customer {
  id: string
  address: string
  email: string
  phone: string
  firstname: string
  lastname: string
  notes: string
  store: Store
}

type CustomerPayloadUpdate = Omit<Customer, 'store'> & {
  storeId: string
}

type CustomerPayloadCreate = Omit<CustomerPayloadUpdate, 'id'>
