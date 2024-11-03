import {Appearance, useColorScheme} from 'react-native';
import {MMKV, useMMKVString} from 'react-native-mmkv';

const storage = new MMKV();

export type City = string;
export type AppTheme = 'light' | 'dark';

export function usePreferences() {
  const [city, setCity] = useMMKVString('pref-city', storage);
  return {
    city: city ?? 'Stockholm',
    setCity,
    appTheme: useColorScheme() ?? 'dark',
    setAppTheme: (theme: AppTheme) => Appearance.setColorScheme(theme),
  };
}
