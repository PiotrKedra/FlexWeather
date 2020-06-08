import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen'

import InitLoader from './src/main/InitLoader';
import AsyncStorage from "@react-native-community/async-storage";
import MainPage from "./src/main/MainPage";
import FirstAppLaunchScreen from "./src/main/FirstAppLaunchScreen";
import InitLocationSearchComponent from "./src/main/location/InitLocationSearchComponent";

const IS_STORAGE = '@is_storage';
const LAST_FORECAST_UPDATE_STORAGE = "@forecast_update_date";
const ACTIVE_LOCATION_STORAGE = '@active_location';
const LAST_FORECAST_STORAGE = '@last_forecast';


const initialState = {
  fontLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVE_LOCATION':
      return Object.assign({}, state, {
        activeLocation: action.payload
      });
    case 'ROOT_FORECAST':
      if(action.payload.saveToStorage) {
        try {
          AsyncStorage.setItem(IS_STORAGE, JSON.stringify(true));
          AsyncStorage.setItem(LAST_FORECAST_UPDATE_STORAGE, JSON.stringify(new Date()));
          AsyncStorage.setItem(ACTIVE_LOCATION_STORAGE, JSON.stringify(action.payload.location));
          AsyncStorage.setItem(LAST_FORECAST_STORAGE, JSON.stringify(action.payload.forecast));
        } catch (e) {
          console.log(e);
        }
      }
      return Object.assign({}, state, {
        currentForecast: action.payload.forecast.current,
        activeLocation: action.payload.location,
        rootForecastPerDay: action.payload.forecast.rootForecast,
        currentTimestamp: action.payload.forecast.currentTimestamp,
        hourlyForecast: action.payload.forecast.hourlyForecast,
        days: action.payload.forecast.days,
        theme: action.payload.theme
      });
    case 'CURRENT_TIMESTAMP':
      return Object.assign({}, state, {
        currentTimestamp: action.payload,
      });
  }
  return state;
};

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
            name="InitLoader"
            component={InitLoader}
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
