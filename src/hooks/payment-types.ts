import { useQuery } from '@tanstack/react-query'
import { getPaymentType, getPaymentTypes } from '../api'
import { validate } from 'uuid'

export const usePaymentTypes = (filters = {}) => useQuery({
  queryFn: () => getPaymentTypes(filters),
  queryKey: ['paymentTypes', filters],
})

export const usePaymentType = (id?: string) => useQuery({
  queryFn: () => getPaymentType(id),
  enabled: validate(id),
  queryKey: ['paymentTypes', {id}],
})
