import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getManufacturers = params =>
  xanyahApi.get<Manufacturer[]>('v2/manufacturers', decamelizeKeys({ params }))

export const getManufacturer = manufacturerId =>
  xanyahApi.get<Manufacturer>(`v2/manufacturers/${manufacturerId}`)

export const updateManufacturer = (manufacturerId, params) =>
  xanyahApi.patch<Manufacturer>(`v2/manufacturers/${manufacturerId}`, decamelizeKeys(params))

export const createManufacturer = newManufacturer =>
  xanyahApi.post<Manufacturer>('v2/manufacturers', decamelizeKeys(newManufacturer))
