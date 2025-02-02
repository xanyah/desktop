import { isString } from 'lodash'
import { DateTime } from 'luxon'

const stringOrDateTime = (date: DateTime | string) => {
  if (isString(date)) {
    return DateTime.fromISO(date)
  }
  return date
}

export const formatLongDatetime = (date: DateTime | string) =>
  stringOrDateTime(date).setLocale('fr-FR').toFormat('ff')
