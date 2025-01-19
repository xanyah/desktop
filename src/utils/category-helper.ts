import { I18n } from 'react-redux-i18n'

export const orderCategories = categories => {
  if(!categories)
    return []

  return categories
    .map(category => ({
      ...category,
      children: categories.filter(cat => cat.categoryId === category.id),
    }))
    .filter(category => !category.categoryId)
}

export const getParentCategoriesList = categories => {
  if(!categories)
    return []

  const parentCategories: any[] = []

  categories
    .filter(category => category.categoryId === null)
    .map(category => {
      parentCategories.push({'label': category.name, 'value': category.id})
    })

  return parentCategories
}


export const getVatRatesOptions = () => {
  return [
    {
      label: I18n.t('vat-rates.standard'),
      value: 'standard_rate',
    },
    {
      label: I18n.t('vat-rates.reduced_rate'),
      value: 'reduced_rate',
    },
    {
      label: I18n.t('vat-rates.reduced_rate_alt'),
      value: 'reduced_rate_alt',
    },
    {
      label: I18n.t('vat-rates.super_reduced_rate'),
      value: 'super_reduced_rate',
    },
    {
      label: I18n.t('vat-rates.parking_rate'),
      value: 'parking_rate',
    },
  ]
}
