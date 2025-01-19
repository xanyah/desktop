import { useQuery } from '@tanstack/react-query'
import { getInventory, getInventories, getInventoryVariants } from '../api'

export const useInventories = (params) => useQuery({
  queryFn: () => getInventories(params),
  queryKey: ['inventories', params],
})
export const useInventory = (id) => useQuery({
  queryFn: () => getInventory(id),
  queryKey: ['inventories', {id}],
})


export const useInventoryVariants = (filters) => useQuery({
  queryFn: () => getInventoryVariants(filters),
  queryKey: ['inventoryVariants', filters],
})
