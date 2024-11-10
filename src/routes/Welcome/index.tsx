import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useAppStyles} from '../../shared/useApptheme';
import {RouteParams} from '../types';
import {Lang, usePreferences} from '../../shared/usePreferences';
import TextButton from '../../shared/components/TextButton';

const useStyles = () => {
  const appStyles = useAppStyles();
  return {
    ...appStyles,
    route: StyleSheet.create({
      welcomeImage: {
        width: '80%',
      },
      buttons: {
        width: 120,
        gap: 16,
      },
    }),
  };
};

type Props = RouteParams<'Location'>;

export default ({navigation}: Props) => {
  const styles = useStyles();
  const {appTheme, setLang} = usePreferences();

  const welcomeImage =
    appTheme === 'light'
      ? require('../../images/assalamualaikum-light.png')
      : require('../../images/assalamualaikum-dark.png');

  const setLanguage = (lang: Lang) => {
    setLang(lang);
    navigation.navigate('Location', {});
  };

  return (
    <View style={styles.page.container}>
      <Image resizeMode="contain" source={welcomeImage} style={styles.route.welcomeImage} />
      <View style={styles.route.buttons}>
        <TextButton text="Svenska" onPress={() => setLanguage('sv')} />
        <TextButton text="English" onPress={() => setLanguage('en')} />
        <TextButton text="عربي" onPress={() => setLanguage('ar')} />
      </View>
    </View>
  );
};
