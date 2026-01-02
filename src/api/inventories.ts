import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getInventories = params =>
  xanyahApi.get<Inventory[]>('v2/inventories', decamelizeKeys({ params }))

export const getInventory = id =>
  xanyahApi.get<Inventory>(`v2/inventories/${id}`)

export const getInventoryProducts = params =>
  xanyahApi.get<InventoryProduct[]>('v2/inventory_products', decamelizeKeys({ params }))
