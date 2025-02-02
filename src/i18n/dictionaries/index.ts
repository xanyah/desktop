import en from './en.json'
import fr from './fr.json'
import zodFr from 'zod-i18n-map/locales/fr/zod.json'
import zodEn from 'zod-i18n-map/locales/en/zod.json'

const resources = {
  en: {
    translation: en,
    zod: zodEn,
  },
  fr: {
    translation: fr,
    zod: zodFr,
  },
}

export default resources
