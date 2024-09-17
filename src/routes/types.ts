import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrayersRouteParams} from './Prayers/types';
import {SettingsRouteParams} from './Settings/types';

export type RouteStackParams = {
  Prayers: PrayersRouteParams;
  Settings: SettingsRouteParams;
};

export type RouteParams<T extends keyof RouteStackParams> = NativeStackScreenProps<RouteStackParams, T>;
