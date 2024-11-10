import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useAppTheme} from '../useApptheme';

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    button: {
      width: '100%',
      height: 40,
      borderRadius: 8,
      backgroundColor: theme.buttonColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.textColor,
      fontWeight: '600',
    },
  });
};

interface Props {
  text: string;
  onPress: () => void;
}

export default function TextButton({text, onPress: onClick}: Props) {
  const styles = useStyles();

  return (
    <Pressable style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
