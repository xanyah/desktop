import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../api'
import { AxiosError } from 'axios'

export const useCurrentToken = () => useQuery({
  queryFn: () => localStorage.getItem(`Xanyah:Bearer`),
  queryKey: ['currentUserToken'],
})

export const useCurrentUser = () => useQuery({
  queryFn: () => getCurrentUser(),
  queryKey: ['currentUser'],
  retry: (failureCount, error: AxiosError) => {
    if (error.status === 401) {
      return false
    }
    return failureCount < 3
  },
})
