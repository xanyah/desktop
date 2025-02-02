import 'i18next'
import fr from '../i18n/dictionaries/fr.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: string
    resources: typeof fr
  }
}
