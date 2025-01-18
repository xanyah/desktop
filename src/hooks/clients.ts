import { useQuery } from '@tanstack/react-query'
import { getClient, getClients, searchClient } from '../api'
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


export const useClient = (id) => useQuery({
  queryFn: () => getClient(id),
  queryKey: ['clients', { id }],
})