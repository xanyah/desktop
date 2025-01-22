import { useQuery } from '@tanstack/react-query'
import { validateToken } from '../api'

export const useCurrentToken = () => useQuery({
  queryFn: () => validateToken(),
  queryKey: ['authToken'],
})
