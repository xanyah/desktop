import { Store } from './stores'

export type Client = {
  id: string,
  address: number,
  email: string,
  firstname: string,
  lastname: string,
  notes: string,
  store: Store,
};