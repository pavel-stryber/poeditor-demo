import i18n from "i18next";
import en from './en.json';
import ar from './ar.json';


export const initTranslations = () => {
  i18n.init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: 'en',
  })
};

