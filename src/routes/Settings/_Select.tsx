import React from 'react';
import Dropdown from 'react-native-input-select';
import {useAppTheme} from '../../shared/useApptheme';
import {StyleSheet, Text} from 'react-native';

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    text: {
      color: theme.linkColor,
      fontSize: 18,
    },
    dropdown: {
      borderWidth: 0,
      backgroundColor: theme.pageColor,
      paddingVertical: 0,
      paddingHorizontal: 0,
      minHeight: 20,
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
  );
}
