import React from 'react';
import WeatherApp from "./src/main/WeatherApp";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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
        </Stack.Navigator>
      </NavigationContainer>
  );
}

