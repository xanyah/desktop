import { useQuery } from '@tanstack/react-query'
import { getInventory, getInventories, getInventoryProducts } from '../api'

export const useInventories = params => useQuery({
  queryFn: () => getInventories(params),
  queryKey: ['inventories', params],
})
export const useInventory = id => useQuery({
  queryFn: () => getInventory(id),
  queryKey: ['inventories', { id }],
})

export const useInventoryProducts = filters => useQuery({
  queryFn: () => getInventoryProducts(filters),
  queryKey: ['inventoryProducts', filters],
})
