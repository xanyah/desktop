import { xanyahApi } from '../constants'

export const postFileImports = params =>
  xanyahApi.post('file_imports', params, { headers: { 'Content-Type': 'multipart/form-data' } })
