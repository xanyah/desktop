import { useQuery } from '@tanstack/react-query'
import { getProvider, getProviders, searchProvider } from '../api'
import { validate } from 'uuid'

export const useProviders = params => useQuery({
  queryFn: () => getProviders(params),
  queryKey: ['providers', params],
})

export const useProvider = id => useQuery({
  queryFn: () => getProvider(id),
  enabled: validate(id),
  queryKey: ['providers', { id }],
})

export const useSearchedProviders = searchQuery => useQuery({
  enabled: !!searchQuery,
  queryFn: () => searchProvider(searchQuery),
  queryKey: ['providers', searchQuery],
})
