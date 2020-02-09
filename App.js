import React from 'react';
import MainPage from "./src/main/MainPage";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="MainPage"
              component={MainPage}
              options={{
                  headerShown : false
              }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

