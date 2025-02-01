import "i18next";
// import all namespaces (for the default language, only)
import fr from "../i18n/dictionaries/fr.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: string;
    resources: typeof fr;
  }
}
