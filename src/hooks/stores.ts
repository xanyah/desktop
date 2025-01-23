import { useQuery } from '@tanstack/react-query'
import { getStores } from '../api'

const useStores = params => useQuery({
  queryFn: () => getStores(params),
  queryKey: ['stores', params],
})

export const useCurrentStore = () => {
  const {data} = useStores({})

  if (data?.data.length) {
    return data.data[0]
  }
}
