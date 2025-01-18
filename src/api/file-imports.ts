import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const postFileImports = params =>
  xanyahApi.post('file_imports', params, { headers: { 'Content-Type': 'multipart/form-data' }})
