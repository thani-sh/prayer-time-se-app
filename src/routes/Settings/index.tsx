import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RouteParams} from '../types';
import Table from './_Table';
import Switch from './_Switch';
import Select from './_Select';
import {AppTheme, City, usePreferences} from '../../shared/usePreferences';
import {useAppStyles, useAppTheme} from '../../shared/useApptheme';
import {cities} from '@thani-sh/prayer-time-se';
import IconButton from '../../shared/components/IconButton';

const useStyles = () => {
  const theme = useAppTheme();
  const appStyles = useAppStyles();
  return {
    ...appStyles,
    route: StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -40,
      },
      screenBottom: {
        marginBottom: 40,
      },
      bottomLink: {
        fontSize: 15,
        color: theme.linkColor,
        letterSpacing: 1,
      },
    }),
  };
};

export const CITIES_LIST: {value: City; label: string}[] = cities.map(city => ({
  value: city,
  label: city,
}));

export const APP_THEMES: {value: AppTheme; label: string}[] = [
  {value: 'light', label: 'Ljus'},
  {value: 'dark', label: 'Mörk'},
];

type Props = RouteParams<'Settings'>;

export default ({navigation}: Props) => {
  const styles = useStyles();
  const preferences = usePreferences();

  const gotoMainScreen = () => {
    navigation.navigate('Prayers', {});
  };

  const changeCity = (value: City) => {
    preferences.setCity(value);
  };
  const selectCity = <Select<City> value={preferences.city} entries={CITIES_LIST} onChange={changeCity} />;

  const changeAppTheme = (value: AppTheme) => {
    preferences.setAppTheme(value);
  };
  const toggleAppTheme = (
    <Switch<AppTheme> value={preferences.appTheme} entries={APP_THEMES} onChange={changeAppTheme} />
  );

  const entries = [
    {key: 'Stad', val: selectCity},
    {key: 'Tema', val: toggleAppTheme},
  ];

  return (
    <View style={styles.page.container}>
      <View style={styles.route.container}>
        <Table entries={entries} />
      </View>
      <View style={styles.route.screenBottom}>
        <Pressable onPress={gotoMainScreen}>
          <IconButton icon="tablerows" onPress={gotoMainScreen} />
        </Pressable>
      </View>
    </View>
  );
};
