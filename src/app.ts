
const appUrl = import.meta.env.VITE_URL
    ? import.meta.env.VITE_URL
    : window.location.hostname
;
const settings = {
    locale: window.navigator.language.substr(0,2),
    fallbackLocale: 'en',
    availableLocale: [
        'ru',
        'en',
    ],
    appUrl: appUrl ,
    logo: {
        wide: appUrl + '/logo_wide.svg',
    },
}
export default settings;
