import { useQuery } from '@tanstack/react-query'
import { getProvider, getProviders, searchProvider } from '../api'

export const useProviders = (params) => useQuery({
  queryFn: () => getProviders(params),
  queryKey: ['providers', params],
})

export const useProvider = (id) => useQuery({
  queryFn: () => getProvider(id),
  queryKey: ['providers', {id}],
})

export const useSearchedProviders = (searchQuery) => useQuery({
  enabled: !!searchQuery,
  queryFn: () => searchProvider(searchQuery),
  queryKey: ['providers', searchQuery],
})
