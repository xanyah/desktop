import React from 'react'

import moment from 'moment'

export const formatData = data =>
  moment(data).isValid()
    ? moment(data).format('llll')
    : data

export const getFormElement = (item) => {
  switch(item.type) {
  case 'textarea': return <textarea name={item.attribute}></textarea>
  case 'number': return <input name={item.attribute} type="number"/>
  case 'string': return <input name={item.attribute} type="text"/>
  }
}
