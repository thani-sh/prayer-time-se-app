import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {usePrayerTimes} from '../../shared/usePrayerTimes';
import {RouteParams} from '../types';
import Table from './_Table';
import {useAppStyles, useAppTheme} from '../../shared/useApptheme';
import {usePreferences} from '../../shared/usePreferences';
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
      selectedDate: {
        fontSize: 15,
        color: theme.linkColor,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
      screenBottom: {
        flexDirection: 'row',
        marginBottom: 40,
        gap: 16,
      },
      bottomLink: {
        fontSize: 15,
        color: theme.linkColor,
        letterSpacing: 1,
      },
    }),
  };
};

function formatDate(date: Date): string {
  const parts = [
    date.toLocaleString('sv', {month: 'short', day: 'numeric', year: 'numeric'}),
    date.toLocaleString('ar-TN-u-ca-islamic', {month: 'short', day: 'numeric', year: 'numeric'}),
  ];
  return parts.join('  |  ');
}

type Props = RouteParams<'Prayers'>;

export default ({navigation}: Props) => {
  const styles = useStyles();
  const {appTheme, isLangSet} = usePreferences();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const entries = usePrayerTimes(date);

  const gotoPreferences = () => {
    navigation.navigate('Settings', {});
  };

  useEffect(() => {
    if (!isLangSet) {
      navigation.navigate('Welcome', {});
    }
  }, [isLangSet, navigation]);

  return (
    <View style={styles.page.container}>
      <View style={styles.route.container}>
        <Text style={styles.text.title}>Bönetider</Text>
        <View style={styles.text.subtitle}>
          <Pressable onPress={() => setIsDatePickerOpen(true)}>
            <Text style={styles.route.selectedDate}>{formatDate(date)}</Text>
          </Pressable>
        </View>
        <Table entries={entries} />
      </View>

      <View style={styles.route.screenBottom}>
        <IconButton icon="calendar" onPress={() => setIsDatePickerOpen(true)} />
        <IconButton icon="settings" onPress={gotoPreferences} />
      </View>

      <DatePicker
        modal
        open={isDatePickerOpen}
        mode="date"
        theme={appTheme}
        cancelText="Återställa"
        confirmText="Bekräfta"
        date={date}
        onConfirm={value => {
          setIsDatePickerOpen(false);
          setDate(value);
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
          setDate(new Date());
        }}
        locale={'sv'}
        title="Välj datum"
      />
    </View>
  );
};
