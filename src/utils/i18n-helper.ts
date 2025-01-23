import { TFunction } from "i18next"

export const supportedLangages = (t:TFunction)=> [
  {
    label: t('supported-langage.french'),
    value: 'fr',
  },
  {
    label: t('supported-langage.english'),
    value: 'en',
  },
]
