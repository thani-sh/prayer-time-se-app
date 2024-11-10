import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StatusBar} from 'react-native';
import PrayersScreen from './src/routes/Prayers';
import SettingsScreen from './src/routes/Settings';
import WelcomeScreen from './src/routes/Welcome';
import LocationScreen from './src/routes/Location';
import {RouteStackParams} from './src/routes/types';
import {useAppTheme} from './src/shared/useApptheme';
import {usePreferences} from './src/shared/usePreferences';

const Stack = createNativeStackNavigator<RouteStackParams>();

const App = () => {
  const theme = useAppTheme();
  const {appTheme} = usePreferences();

  React.useEffect(() => {
    StatusBar.setBackgroundColor(theme.pageColor);
    StatusBar.setTranslucent(true);
  }, [theme.pageColor]);

  return (
    <NavigationContainer theme={appTheme === 'light' ? DefaultTheme : DarkTheme}>
      <Stack.Navigator initialRouteName="Location">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{title: 'Welcome', headerShown: false}} />
        <Stack.Screen name="Location" component={LocationScreen} options={{title: 'Location', headerShown: false}} />
        <Stack.Screen name="Prayers" component={PrayersScreen} options={{title: 'Prayers', headerShown: false}} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings', headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
