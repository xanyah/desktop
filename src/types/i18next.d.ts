import fr from '../i18n/dictionaries/fr.json'
import zodFr from 'zod-i18n-map/locales/fr/zod.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof fr
      zod: typeof zodFr
    }
  }
}
