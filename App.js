import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import AppLauncher from './src/main/AppLauncher';
import WeatherScreen from './src/main/weather/WeatherScreen';
import SearchScreen from './src/main/location/SearchScreen';
import store from './src/main/ReduxStore';
import AboutScreen from './src/main/menu/settingscreens/AboutScreen';
import SupportScreen from './src/main/menu/settingscreens/SupportScreen';
import AppearanceScreen from './src/main/menu/settingscreens/AppearanceScreen';
import {getDarkTheme, getLightTheme} from './src/main/theme/Theme';
import SetupScreen from './src/main/firstapplaunch/SetupScreen';
import SettingScreen from './src/main/menu/settingscreens/SettingScreen';
import WelcomeScreen from './src/main/firstapplaunch/WelcomeScreen';
import SetupLocationScreen from './src/main/firstapplaunch/SetupLocationScreen';
import CurrentLocationScreen from './src/main/firstapplaunch/CurrentLocationScreen';
import ManualLocationScreen from './src/main/firstapplaunch/ManualLocationScreen';
import SetupUnitsScreen from './src/main/firstapplaunch/SetupUnitsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(getLightTheme());
  useEffect(() => {
    SplashScreen.hide();
    AsyncStorage.getItem('@theme')
        .then((theme) => {
          if (theme === 'light') {
            setTheme(getLightTheme());
          } else if (theme === 'dark') {
            setTheme(getDarkTheme());
          }
        });
  });

  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AppLauncher"
            component={AppLauncher}
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}
          />
          <Stack.Screen
            name="SetupScreen"
            component={SetupScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="SetupUnitsScreen"
            component={SetupUnitsScreen}
            options={getSettingScreenOptions('UNITS', theme)}
          />
          <Stack.Screen
            name="SetupLocationScreen"
            component={SetupLocationScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ManualLocationScreen"
            component={ManualLocationScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="CurrentLocationScreen"
            component={CurrentLocationScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              title: null,
              headerTintColor: theme.mainText,
              headerStyle: {
                backgroundColor: theme.mainColor,
                elevation: 0,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="MainPage"
            component={WeatherScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={getSettingScreenOptions('SETTINGS', theme)}
          />
          <Stack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={getSettingScreenOptions('ABOUT', theme)}
          />
          <Stack.Screen
            name="SupportScreen"
            component={SupportScreen}
            options={getSettingScreenOptions('SUPPORT', theme)}
          />
          <Stack.Screen
            name="AppearanceScreen"
            component={AppearanceScreen}
            options={getSettingScreenOptions('APPEARANCE', theme)}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function getSettingScreenOptions(title, theme) {
  return {
    title,
    headerLeft: null,
    headerStyle: {
      backgroundColor: theme.mainColor,
      elevation: 1,
    },
    headerTitleStyle: {
      fontFamily: 'Neucha-Regular',
      fontSize: 22,
      color: theme.mainText,
      paddingHorizontal: Dimensions.get('window').width / 20,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
}
