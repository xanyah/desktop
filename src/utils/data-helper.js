import moment from 'moment'

export const formatData = data =>
  moment(data).isValid()
    ? moment(data).format('llll')
    : data
