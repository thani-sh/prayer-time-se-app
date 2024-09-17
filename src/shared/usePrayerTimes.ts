import {forDate} from '@thani-sh/prayer-time-se';
import {usePreferences} from './usePreferences';

export function getPrayerTimes(city: string, date: Date) {
  const times = forDate(city, date);
  return [
    {key: 'Fajr', val: times.fajr},
    {key: 'Shuruk', val: times.sunrise},
    {key: 'Dhohr', val: times.dhuhr},
    {key: 'Asr', val: times.asr},
    {key: 'Maghrib', val: times.maghrib},
    {key: 'Isha', val: times.isha},
  ];
}

export function usePrayerTimes(date: Date) {
  const {city} = usePreferences();
  return getPrayerTimes(city, date);
}
