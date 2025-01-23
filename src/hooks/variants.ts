import { useQuery } from '@tanstack/react-query'
import { getVariantsV2 } from '../api'

export const useVariants = (filters) => useQuery({
  queryFn: () => getVariantsV2(filters),
  queryKey: ['variants', filters],
})
