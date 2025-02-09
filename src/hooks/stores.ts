import { useQuery } from '@tanstack/react-query'
import { getStoreMemberships, getStores } from '../api'
import { find } from 'lodash'
import { useCurrentUser } from './current-user'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (data?.data.length && data.data[0].color) {
      const root: HTMLDivElement | null = document.querySelector(':root')
      if (root) {
        root.style.setProperty('--color-primary', data.data[0].color)
      }
    }
  }, [data])

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

  return find(data?.data, { storeId: currentStore?.id })?.role
}
