import moment from 'moment'

export const getGreetingTime = (m = moment()) => {
  let g

  if (!m || !m.isValid()) { return }

  const split_afternoon = 12
  const split_evening = 17
  const currentHour = parseFloat(m.format('HH'))

  if(currentHour >= split_afternoon && currentHour <= split_evening) {
    g = 'afternoon'
  } else if(currentHour >= split_evening) {
    g = 'evening'
  } else {
    g = 'morning'
  }

  return g
}
