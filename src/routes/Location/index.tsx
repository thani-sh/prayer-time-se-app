import {cities} from '@thani-sh/prayer-time-se';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppStyles, useAppTheme} from '../../shared/useApptheme';
import {City, usePreferences} from '../../shared/usePreferences';
import {RouteParams} from '../types';
import TextDropdown from '../../shared/components/TextDropdown';
import IconButton from '../../shared/components/IconButton';

export const CITIES_LIST: {value: City; label: string}[] = cities.map(city => ({
  value: city,
  label: city,
}));

const useStyles = () => {
  const theme = useAppTheme();
  const appStyles = useAppStyles();
  return {
    ...appStyles,
    route: StyleSheet.create({
      text: {
        fontSize: 20,
        letterSpacing: 1,
        color: theme.textColor,
      },
      dropdown: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10,
      },
    }),
  };
};

type Props = RouteParams<'Location'>;

export default ({navigation}: Props) => {
  const styles = useStyles();
  const preferences = usePreferences();

  const changeCity = (value: City) => {
    preferences.setCity(value);
    navigation.navigate('Prayers', {});
  };

  const getUserLocation = () => {
    // TODO: get location from the device
  };

  return (
    <View style={styles.page.container}>
      <Text style={styles.route.text}>Please select your location</Text>
      <View style={styles.route.dropdown}>
        <TextDropdown<City> value={preferences.city} entries={CITIES_LIST} onChange={changeCity} />
        <IconButton icon="location" onPress={getUserLocation} />
      </View>
    </View>
  );
};
