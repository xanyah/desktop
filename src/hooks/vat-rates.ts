import { useQuery } from '@tanstack/react-query'
import { getVatRate, getVatRates } from '../api'
import { validate } from 'uuid'

export const useVatRates = filters => useQuery({
  queryFn: () => getVatRates(filters),
  queryKey: ['vatRates', filters],
})

export const useVatRate = (id?: VatRate['id']) => useQuery({
  queryFn: () => getVatRate(id),
  enabled: !!validate(id),
  queryKey: ['vatRates', { id }],
})
