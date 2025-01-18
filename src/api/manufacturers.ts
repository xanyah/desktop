import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getManufacturers = params =>
  xanyahApi.get<Manufacturer[]>('manufacturers', decamelizeKeys({params}))
export const updateManufacturer = (manufacturerId, params) =>
  xanyahApi.patch(`manufacturers/${manufacturerId}`, decamelizeKeys(params))
export const createManufacturer = newManufacturer =>
  xanyahApi.post('manufacturers', decamelizeKeys(newManufacturer))
export const searchManufacturer = params =>
  xanyahApi.get<Manufacturer[]>('manufacturers/search', decamelizeKeys({params}))
