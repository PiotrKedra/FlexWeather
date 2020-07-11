import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen'

import AppLauncher from './src/main/AppLauncher';
import WeatherScreen from "./src/main/WeatherScreen";
import FirstAppLaunchScreen from "./src/main/FirstAppLaunchScreen";
import InitLocationSearchComponent from "./src/main/location/InitLocationSearchComponent";
import reducer from "./src/main/ReduxReducer";
import AboutScreen from "./src/main/menu/settingscreens/AboutScreen";
import SupportScreen from "./src/main/menu/settingscreens/SupportScreen";
import AppearanceScreen from "./src/main/menu/settingscreens/AppearanceScreen";

const store = createStore(reducer);

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    SplashScreen.hide();
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
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
          />
          <Stack.Screen name="FirstAppLaunch"
                        component={FirstAppLaunchScreen}
                        options={{
                          headerShown: false,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                        }}/>
          <Stack.Screen name="SearchScreen"
                        component={InitLocationSearchComponent}
                        options={{
                          title: null,
                          headerStyle: {
                            backgroundColor: '#eee',
                            elevation: 0,
                          },
                          headerTitleStyle: {
                            fontWeight: 'bold',
                          },
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                        }}/>
          <Stack.Screen name="MainPage"
                        component={WeatherScreen}
                        options={{
                          headerShown: false,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                        }}/>
            <Stack.Screen name="AboutScreen"
                          component={AboutScreen}
                          options={getSettingScreenOptions('ABOUT')}/>
          <Stack.Screen name="SupportScreen"
                        component={SupportScreen}
                        options={getSettingScreenOptions('SUPPORT')}/>
          <Stack.Screen name="AppearanceScreen"
                        component={AppearanceScreen}
                        options={getSettingScreenOptions('APPEARANCE')}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function getSettingScreenOptions(title){
    return {
        title: title,
        headerLeft: null,
        headerStyle: {
            backgroundColor: '#eee',
            elevation: 0,
        },
        headerTitleStyle: {
            fontFamily: 'Neucha-Regular',
            fontSize: 22,
            paddingHorizontal: Dimensions.get('window').width/20
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }
}
