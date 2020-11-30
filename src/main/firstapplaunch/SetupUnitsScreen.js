import React from 'react';
import {View} from 'react-native';
import WeatherUnitsSettings from '../units/WeatherUnitsSettings';

const SetupUnitsScreen = () => {
  return (
    <View style={{margin: '10%'}}>
      <WeatherUnitsSettings/>
    </View>
  );
};

export default SetupUnitsScreen;
