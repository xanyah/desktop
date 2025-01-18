import { useQuery } from '@tanstack/react-query'
import { getClients, searchClient } from '../api'
import { ObjectValidator } from '../utils'

export const useClients = () => useQuery({
  queryFn: getClients,
  queryKey: ['clients'],
})

export const useSearchedClients = (searchQuery) => useQuery({
  enabled: !!ObjectValidator(searchQuery),
  queryFn: () => searchClient(searchQuery),
  queryKey: ['clients', searchQuery],
})
