import { head, split } from 'lodash'

export const uuidNumber = (uuid?: string) =>
  head(split(uuid, '-'))
