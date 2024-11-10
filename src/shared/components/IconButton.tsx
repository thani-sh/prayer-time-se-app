import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {useAppTheme} from '../useApptheme';

const ICONS = {
  settings: require('../../images/settings.png'),
  calendar: require('../../images/calendar.png'),
  tablerows: require('../../images/tablerows.png'),
  location: require('../../images/location.png'),
} as const;

type IconType = keyof typeof ICONS;

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.buttonColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: theme.linkColor,
    },
  });
};

interface Props {
  icon: IconType;
  onPress: () => void;
}

export default function IconButton({icon, onPress: onClick}: Props) {
  const styles = useStyles();

  return (
    <Pressable style={styles.button} onPress={onClick}>
      <Image source={ICONS[icon]} style={styles.icon} />
    </Pressable>
  );
}
