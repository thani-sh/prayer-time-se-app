import React from 'react';
import Dropdown from 'react-native-input-select';
import {useAppTheme} from '../../shared/useApptheme';
import {StyleSheet, Text, View} from 'react-native';

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    wrapper: {
      width: 160,
    },
    text: {
      color: theme.linkColor,
      fontSize: 18,
    },
    dropdown: {
      borderWidth: 0,
      minHeight: 40,
      borderRadius: 8,
      backgroundColor: theme.buttonColor,
      paddingVertical: 0,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    modal: {
      backgroundColor: theme.modalColor,
    },
    hidden: {
      display: 'none',
    },
  });
};

interface LabelProps {
  label: string;
}

function Label({label}: LabelProps) {
  const styles = useStyles();
  return <Text style={styles.text}>{label}</Text>;
}

export interface Props<T extends string> {
  value: T;
  entries: {value: T; label: string}[];
  onChange: (value: T) => void;
}

export default function <T extends string>({value, entries, onChange}: Props<T>) {
  const styles = useStyles();
  const dropdownOptions = entries.map(entry => ({
    value: entry.value,
    label: <Label label={entry.label} />,
  }));
  return (
    <View style={styles.wrapper}>
      <Dropdown
        selectedValue={value}
        onValueChange={onChange}
        options={dropdownOptions}
        dropdownStyle={styles.dropdown}
        dropdownIconStyle={styles.hidden}
        modalControls={{
          modalOptionsContainerStyle: styles.modal,
        }}
        listComponentStyles={{
          itemSeparatorStyle: styles.hidden,
        }}
      />
    </View>
  );
}
