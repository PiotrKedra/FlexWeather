import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from "redux";
import {Provider} from "react-redux";

import WeatherApp from "./src/main/WeatherApp";
import LocationSearch from "./src/main/location/LocationSearch";


const initialState = {
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CURRENT_TIMESTAMP':
            return Object.assign({}, state, {
                currentTimestamp: action.payload
            });
        case 'ROOT_FORECAST':
            console.log('ROOT_FORECAST');
            return Object.assign({}, state, {
                rootForecastPerDay: action.payload.rootForecastPerDay,
                currentTimestamp: action.payload.currentTimestamp,
                days: action.payload.days,
                navigation: action.payload.navigation,
            });
    }
    return state;
};

const store =  createStore(reducer);

const Stack = createStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                  name="WeatherApp"
                  component={WeatherApp}
                  options={{
                      headerShown : false
                  }}
              />
              <Stack.Screen name="LocationSearch" component={LocationSearch}/>
            </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}

