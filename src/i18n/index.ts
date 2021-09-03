// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ua from './locales/ua.json'
import ru from './locales/ru.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ua',
    debug: true,
    lng: 'ua',
    resources: {
      ua: { translation: ua },
      en: { translation: en },
      ru: { translation: ru },
    },
    ns: 'translation',
    interpolation: {
      formatSeparator: '.',
    },
    react: {
      wait: true,
    },
  })

export default i18n
