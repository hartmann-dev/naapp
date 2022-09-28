import * as Localization from 'expo-localization';

export function getLocale() {
  const { locale } = Localization;
  const userLocale = locale.split('-')[0].toLowerCase();
  return ['de', 'en'].includes(userLocale) ? userLocale : 'en';
}
