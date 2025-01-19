import React from 'react'
import Select from 'react-select'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import Input from '../input'

import {
  isOfEntityType,
  getModel,
  getTypeOptions,
} from '../../utils/data-helper'
import {
  getParentCategoriesList,
  getVatRatesOptions,
} from '../../utils/category-helper'

import './styles.scss'

//TODO add checkbox / Vat Rates ? / Parent Category ? Sofiane
//TODO: formatPrice on Price
//TODO: link in entity type to the concerned entity
const FormAttribute = item => {
  return (
    <div className={item.inline ? 'form-attribute inline' : 'form-attribute'}>
      <label htmlFor={item.attribute}>
        <Translate value={`models.${item.model}.${item.attribute}`}/>
      </label>
      { getFormElement(item) }
    </div>
  )
}

const getFormElement = item => {
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
      <Input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="number"
      />
    )
  case 'string':
    return (
      <Input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="text"
      />
    )
  case 'entity':
    return getSelect(item)
  case 'type':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={e => item.onUpdate(item.attribute, e.value)}
        options={getTypeOptions()}
      />
    )
  case 'select':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={e => item.onUpdate(item.attribute, e.value)}
        options={item.options}
      />
    )
  case 'parent-category':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={e => item.onUpdate(item.attribute, e.value)}
        options={getParentCategoriesList(item['categories'])}
      />
    )
  case 'password':
    return (
      <Input
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="password"
      />
    )
  case 'vat-rates':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={e => item.onUpdate(item.attribute, e.value)}
        options={getVatRatesOptions()}
      />
    )
  }
}

const getSelect = item => {
  if(!isOfEntityType(item.attribute)) {
    return null
  }

  let model = getModel(item.attribute)

  return (
    <Select
      name={item.attribute}
      value={item.value.id}
      onChange={
        e => item
          .onUpdate(item.attribute, item[model]
            .find(entity => entity.id === e.value))
      }
      options={item[model].map(entity => ({
        label: (entity.name)
          ? entity.name
          : (entity.firstname)
            ? entity.firstname
            : entity.id,
        value: entity.id,
      }))}
    />
  )
}

FormAttribute.propTypes = {
  attribute: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

FormAttribute.defaultProps = {
  attribute: '',
  type: '',
  value: '',
}

export default FormAttribute
