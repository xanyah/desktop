import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getManufacturers = params =>
  xanyahApi.get<Manufacturer[]>('manufacturers', decamelizeKeys({params}))

export const getManufacturer = (manufacturerId) =>
  xanyahApi.get<Manufacturer>(`manufacturers/${manufacturerId}`)

export const updateManufacturer = (manufacturerId, params) =>
  xanyahApi.patch<Manufacturer>(`manufacturers/${manufacturerId}`, decamelizeKeys(params))

export const createManufacturer = newManufacturer =>
  xanyahApi.post<Manufacturer>('manufacturers', decamelizeKeys(newManufacturer))

export const searchManufacturer = params =>
  xanyahApi.get<Manufacturer[]>('manufacturers/search', decamelizeKeys({params}))
