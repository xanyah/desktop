import { useQuery } from '@tanstack/react-query'
import { getStores } from '../api'
import { isEmpty } from 'lodash'

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
