import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WeatherApp from "./src/main/WeatherApp";
import LocationSearch from "./src/main/location/LocationSearch";

const Stack = createStackNavigator();

export default function App() {
  return (
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
  );
}

