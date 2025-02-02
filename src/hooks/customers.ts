import { useQuery } from '@tanstack/react-query'
import { getCustomer, getCustomers } from '../api'
import { validate } from 'uuid'

export const useCustomers = params => useQuery({
  queryFn: () => getCustomers(params),
  queryKey: ['customers', params],
})

export const useCustomer = (id?: Customer['id']) => useQuery({
  queryFn: () => getCustomer(id),
  queryKey: ['customers', { id }],
  enabled: !!validate(id),
})
