import { useQuery } from '@tanstack/react-query'
import { getPaymentTypes } from '../api'

export const usePaymentTypes = (filters) => useQuery({
  queryFn: () => getPaymentTypes(filters),
  queryKey: ['paymentTypes', filters],
})
