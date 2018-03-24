import React from 'react'

import moment from 'moment'

export const formatData = (data, column) => {
  if(isOfDateType(column)) {
    return moment(data).isValid()
      ? moment(data).format('llll')
      : data
  } else {
    return data
  }
}

export const isOfDateType = attribute =>
  [
    'createdAt',
    'updatedAt',
    'lockedAt',
  ].includes(attribute)


export const getFormElement = (item) => {
  switch(item.type) {
  case 'textarea':
    return (
      <textarea
        onChange={e =>item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}>
      </textarea>
    )
  case 'number':
    return (
      <input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="number"
      />
    )
  case 'string':
    return (
      <input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="text"
      />
    )
  }
}
