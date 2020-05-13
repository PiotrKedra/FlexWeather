import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import InitLoader from './src/main/InitLoader';
import AsyncStorage from "@react-native-community/async-storage";


const ACTIVE_LOCATION_STORAGE = '@active_location';

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
      console.log('ROOT_FORECAST');
      try {
        AsyncStorage.setItem(ACTIVE_LOCATION_STORAGE, JSON.stringify(action.payload.location));
      } catch (e) {
        console.log(e);
      }
      return Object.assign({}, state, {
        activeLocation: action.payload.location,
        rootForecastPerDay: action.payload.forecast.rootForecast,
        currentTimestamp: action.payload.forecast.currentTimestamp,
        hourlyForecast: action.payload.forecast.hourlyForecast,
        days: action.payload.forecast.days,
      });
    case 'CURRENT_TIMESTAMP':
      return Object.assign({}, state, {
        currentTimestamp: action.payload,
      });
    case 'FORECAST_IN_NEW_LOCATION':

      return Object.assign({}, state, {
        activeLocation: action.payload.location,
        rootForecastPerDay: action.payload.forecast.rootForecast,
        currentTimestamp: action.payload.forecast.currentTimestamp,
        hourlyForecast: action.payload.forecast.hourlyForecast,
        days: action.payload.forecast.days,
      });
    case 'FONT_LOADED':
      return Object.assign({}, state, {
        fontLoaded: true,
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
