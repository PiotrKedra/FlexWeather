import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen'

import AppLauncher from './src/main/AppLauncher';
import MainPage from "./src/main/MainPage";
import FirstAppLaunchScreen from "./src/main/FirstAppLaunchScreen";
import InitLocationSearchComponent from "./src/main/location/InitLocationSearchComponent";
import reducer from "./src/main/ReduxReducer";

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
                        component={MainPage}
                        options={{
                          headerShown: false,
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                        }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
