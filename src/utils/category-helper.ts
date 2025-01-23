import { TFunction } from "i18next"

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


export const getVatRatesOptions = (t: TFunction) => {
  return [
    {
      label: t('vat-rates.standard'),
      value: 'standard_rate',
    },
    {
      label: t('vat-rates.reduced_rate'),
      value: 'reduced_rate',
    },
    {
      label: t('vat-rates.reduced_rate_alt'),
      value: 'reduced_rate_alt',
    },
    {
      label: t('vat-rates.super_reduced_rate'),
      value: 'super_reduced_rate',
    },
    {
      label: t('vat-rates.parking_rate'),
      value: 'parking_rate',
    },
  ]
}
