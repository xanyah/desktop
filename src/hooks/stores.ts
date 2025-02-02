import { useQuery } from '@tanstack/react-query'
import { getStoreMemberships, getStores } from '../api'
import { find } from 'lodash'
import { useCurrentUser } from './current-user'

const useStores = (params = {}) => useQuery({
  queryFn: () => getStores(params),
  queryKey: ['stores', params],
})

export const useStoreMemberships = (params = {}) => useQuery({
  queryFn: () => getStoreMemberships(params),
  queryKey: ['storeMemberships', params],
})

export const useCurrentStore = () => {
  const { data } = useStores({})

  if (data?.data.length) {
    return data.data[0]
  }
}

export const useCurrentStoreRole = () => {
  const currentStore = useCurrentStore()
  const { data: currentUserData } = useCurrentUser()
  const { data } = useStoreMemberships({
    'q[userIdEq]': currentUserData?.data.id,
  })

  console.log(currentStore, data?.data)

  return find(data?.data, { storeId: currentStore?.id })?.role
}
