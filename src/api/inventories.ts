import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getInventories = params =>
  xanyahApi.get('inventories', decamelizeKeys({params}))

export const getInventory = id =>
  xanyahApi.get(`inventories/${id}`)

export const getInventoryVariants = params =>
  xanyahApi.get('inventory_variants', decamelizeKeys({params}))
