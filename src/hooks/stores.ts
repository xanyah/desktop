import { useQuery } from '@tanstack/react-query'
import { getStores } from '../api'

export const useStores = (filters) => useQuery({
  queryFn: () => getStores(filters),
  queryKey: ['stores', filters],
})

export const useCurrentStore = () => {
  const { data } = useStores({})

  if (data?.data.length) {
    return data.data[0]
  }
}
