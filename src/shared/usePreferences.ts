import {Appearance, useColorScheme} from 'react-native';
import {MMKV, useMMKVString} from 'react-native-mmkv';

const storage = new MMKV();

export type Lang = 'en' | 'sv' | 'ar';
export const DefaultLang: Lang = 'sv';

export type City = string;
export const DefaultCity: City = 'Stockholm';

export type AppTheme = 'light' | 'dark';
export const DefaultAppTheme: AppTheme = 'dark';

export function usePreferences() {
  const [lang, setLang] = useMMKVString('pref.lang', storage);
  const [city, setCity] = useMMKVString('pref.city', storage);
  return {
    lang: lang ?? DefaultLang,
    setLang,
    isLangSet: !!lang,
    city: city ?? DefaultCity,
    setCity,
    appTheme: useColorScheme() ?? DefaultAppTheme,
    setAppTheme: (theme: AppTheme) => Appearance.setColorScheme(theme),
  };
}
