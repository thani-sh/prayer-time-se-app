import {StyleSheet} from 'react-native';
import {usePreferences} from './usePreferences';

export interface Theme {
  pageColor: string;
  textColor: string;
  linkColor: string;
  lineColor: string;
  modalColor: string;
  buttonColor: string;
}

export const DarkTheme: Theme = {
  pageColor: '#000000',
  textColor: '#FAFAFA',
  linkColor: '#616161',
  lineColor: '#212121',
  modalColor: '#212121',
  buttonColor: '#111111',
};

export const LightTheme: Theme = {
  pageColor: '#FFFFFF',
  textColor: '#263238',
  linkColor: '#546E7A',
  lineColor: '#90A4AE',
  modalColor: '#FFFFFF',
  buttonColor: '#EEEEEE',
};

export const useAppTheme = () => {
  const {appTheme} = usePreferences();
  return appTheme === 'light' ? LightTheme : DarkTheme;
};

export const useAppStyles = () => {
  const theme = useAppTheme();
  return {
    /**
     * Page styles
     */
    page: StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.pageColor,
      },
    }),

    /**
     * Text styles
     */
    text: StyleSheet.create({
      title: {
        fontSize: 42,
        fontWeight: '600',
        letterSpacing: 1,
        color: theme.textColor,
      },
      subtitle: {
        fontSize: 15,
        letterSpacing: 1,
        color: theme.textColor,
      },
    }),
  };
};
