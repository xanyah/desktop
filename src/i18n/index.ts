import i18n from 'i18n';
import dictionaries from './locales';

i18n.configure({
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    staticCatalog: dictionaries, // Utilisez vos dictionnaires ici
    objectNotation: true,
});

export default i18n;