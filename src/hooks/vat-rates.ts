import { useQuery } from '@tanstack/react-query'
import { getSale, getSales, getVatRates } from '../api'

export const useVatRates = (filters) => useQuery({
  queryFn: () => getVatRates(filters),
  queryKey: ['vatRates', filters],
})
