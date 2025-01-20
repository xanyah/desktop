import { useQuery } from '@tanstack/react-query'
import { getStores } from '../api'
import { isEmpty } from 'lodash'

export const useCurrentStore = () => useQuery({
  queryFn: () => getStores().then((response) => {
    const storesData = response.data
    if (!isEmpty(storesData)) {
      return storesData[0]
    }
  }),
  queryKey: ['stores'],
})

