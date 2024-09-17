import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RouteParams} from '../types';
import Table from './_Table';
import Switch from './_Switch';
import Select from './_Select';
import {AppTheme, City, usePreferences} from '../../shared/usePreferences';
import {useAppTheme} from '../../shared/useApptheme';
import {cities} from '@thani-sh/prayer-time-se';

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.pageColor,
    },
    screenContent: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: -40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    screenBottom: {
      marginBottom: 40,
    },
    bottomLink: {
      fontSize: 15,
      color: theme.linkColor,
      letterSpacing: 1,
    },
  });
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
    <View style={styles.container}>
      <View style={styles.screenContent}>
        <Table entries={entries} />
      </View>
      <View style={styles.screenBottom}>
        <Pressable onPress={gotoMainScreen}>
          <Text style={styles.bottomLink}>tillbaka</Text>
        </Pressable>
      </View>
    </View>
  );
};
