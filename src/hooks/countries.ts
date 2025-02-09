import { useQuery } from '@tanstack/react-query'
import { getCountry, getCountries } from '../api'
import { validate } from 'uuid'

export const useCountries = filters => useQuery({
  queryFn: () => getCountries(filters),
  queryKey: ['Countries', filters],
})

export const useCountry = (id?: Country['id']) => useQuery({
  queryFn: () => getCountry(id),
  enabled: !!validate(id),
  queryKey: ['Countries', { id }],
})
