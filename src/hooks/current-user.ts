import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../api'

export const useCurrentUser = () => useQuery({
  queryFn: () => getCurrentUser(),
  queryKey: ['currentUser'],
})
