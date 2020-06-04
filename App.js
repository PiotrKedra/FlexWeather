import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import InitLoader from './src/main/InitLoader';
import AsyncStorage from "@react-native-community/async-storage";


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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="InitLoader"
            component={InitLoader}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
