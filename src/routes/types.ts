import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrayersRouteParams} from './Prayers/types';
import {SettingsRouteParams} from './Settings/types';
import {WelcomeRouteParams} from './Welcome/types';
import {LocationRouteParams} from './Location/types';

export type RouteStackParams = {
  Prayers: PrayersRouteParams;
  Settings: SettingsRouteParams;
  Welcome: WelcomeRouteParams;
  Location: LocationRouteParams;
};

export type RouteParams<T extends keyof RouteStackParams> = NativeStackScreenProps<RouteStackParams, T>;
