import React from 'react'
import Select from 'react-select'

import {
  isOfEntityType,
  getModel,
  getTypeOptions,
} from '../../utils/data-helper'
import {
  getParentCategoriesList,
  getVatRatesOptions,
} from '../../utils/category-helper'

import { map } from 'lodash'
import { Trans, useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { InputText } from '../ui'

interface Option {
  value: string
  label: string
}

interface Item {
  attribute: string
  error?: string
  model: string
  onUpdate: (value: string) => void
  type: string
  value: any
  inline?: boolean
  options?: Option[]
}

//TODO add checkbox / Vat Rates ? / Parent Category ? Sofiane
//TODO: formatPrice on Price
//TODO: link in entity type to the concerned entity
const FormAttribute = (item: Item) => {
  const { t } = useTranslation()

  return (
    <div className={item.inline ? 'form-attribute inline' : 'form-attribute'}>
      <label htmlFor={item.attribute}>
        <Trans i18nKey={`models.${item.model}.${item.attribute}`} />
      </label>
      {getFormElement(item, t)}
      {item.error && <div className="error-message">{item.error}</div>}
    </div>
  )
}

const getFormElement = (item, t: TFunction) => {
  switch (item.type) {
  case 'textarea':
    return (
      <textarea
        onChange={(e) => item.onUpdate(e.target.value)}
        value={item.value}
        name={item.attribute}
      ></textarea>
    )
  case 'number':
    return (
      <InputText
        onChange={(e) => item.onUpdate(e.target.value)}
        value={item.value}
        type="number"
      />
    )
  case 'string':
    return (
      <InputText
        onChange={(e) => item.onUpdate(e.target.value)}
        value={item.value}
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
        onChange={(e) => item.onUpdate(e.value)}
        options={getTypeOptions()}
      />
    )
  case 'select':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={(e) => item.onUpdate(e.value)}
        options={item.options}
      />
    )
  case 'parent-category':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={(e) => item.onUpdate(e.value)}
        options={getParentCategoriesList(item['categories'])}
      />
    )
  case 'password':
    return (
      <InputText
        onChange={(e) => item.onUpdate(e.target.value)}
        value={item.value}
        type="password"
      />
    )
  case 'vat-rates':
    return (
      <Select
        name={item.attribute}
        value={item.value}
        onChange={(e) => item.onUpdate(e.value)}
        options={getVatRatesOptions(t)}
      />
    )
  }
}

const getSelect = (item: Item) => {
  if (!isOfEntityType(item.attribute)) {
    return null
  }

  const model = getModel(item.attribute)

  return (
    <Select
      name={item.attribute}
      value={item.value?.id}
      onChange={(e: any) =>
        model &&
        item.onUpdate(item[model].find((entity: any) => entity.id === e.value))
      }
      options={
        model
          ? map(
            item[model]((entity: any) => ({
              label: entity.name
                ? entity.name
                : entity.firstname
                  ? entity.firstname
                  : entity.id,
              value: entity.id,
            }))
          )
          : []
      }
    />
  )
}

export default FormAttribute
