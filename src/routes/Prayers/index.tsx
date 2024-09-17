import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {usePrayerTimes} from '../../shared/usePrayerTimes';
import {RouteParams} from '../types';
import Table from './_Table';
import {useAppTheme} from '../../shared/useApptheme';
import {usePreferences} from '../../shared/usePreferences';

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
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
    screenTitle: {
      fontSize: 42,
      fontWeight: '600',
      letterSpacing: 1,
      color: theme.textColor,
    },
    screenSubtitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    selectedDate: {
      fontSize: 15,
      color: theme.linkColor,
      letterSpacing: 1,
      textTransform: 'uppercase',
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
  const theme = useAppTheme();
  const {appTheme} = usePreferences();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const entries = usePrayerTimes(date);

  const gotoPreferences = () => {
    navigation.navigate('Settings', {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>Bönetider</Text>
        <View style={styles.screenSubtitle}>
          <Pressable onPress={() => setOpen(true)}>
            <Text style={styles.selectedDate}>{formatDate(date)}</Text>
          </Pressable>
        </View>
        <Table entries={entries} />
      </View>

      <View style={styles.screenBottom}>
        <Pressable onPress={gotoPreferences}>
          <Text style={styles.bottomLink}>inställningar</Text>
        </Pressable>
      </View>

      <DatePicker
        modal
        open={open}
        mode="date"
        theme={appTheme}
        textColor={theme.textColor}
        cancelText="Återställa"
        confirmText="Bekräfta"
        date={date}
        onConfirm={value => {
          setOpen(false);
          setDate(value);
        }}
        onCancel={() => {
          setOpen(false);
          setDate(new Date());
        }}
        locale={'sv'}
        title="Välj datum"
      />
    </View>
  );
};
