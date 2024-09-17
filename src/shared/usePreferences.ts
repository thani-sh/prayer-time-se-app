import {Appearance, useColorScheme} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export type City = string;
export type AppTheme = 'light' | 'dark';

export function usePreferences() {
  const [city, setCity] = useMMKVStorage<City>('pref-city', storage, 'Stockholm');
  return {
    city,
    setCity,
    appTheme: useColorScheme() ?? 'dark',
    setAppTheme: (theme: AppTheme) => Appearance.setColorScheme(theme),
  };
}
