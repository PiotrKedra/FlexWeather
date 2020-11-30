import CustomModal from '../firstapplaunch/setupmodals/CustomModal';
import Text from '../components/CustomText';
import {Pressable, StyleSheet, View} from 'react-native';
import CheckBox from '../components/CheckBox';
import React from 'react';
import {connect} from 'react-redux';
import {CLOCK_12H, CLOCK_24H} from './UnitsValues';

const ClockUnitModal = ({isVisible, setVisible, theme, weatherUnits, setWeatherUnits}) => {
  const timeUnit = weatherUnits.clock;

  return (
    <CustomModal isVisible={isVisible} setVisible={setVisible} mainColor={theme.mainColor}>
      <Text style={{fontSize: 30, color: theme.mainText}}>Clock hours</Text>
      <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
        android_ripple={{color: '#ddd'}}
        onPress={() => {
          setWeatherUnits({...weatherUnits, clock: CLOCK_24H}); setVisible(false);
        }}>
        <CheckBox checked={timeUnit===CLOCK_24H} color={theme.mainText}/>
        <Text style={[styles.themeEle, {color: theme.mainText}]}>24h clock</Text>
      </Pressable>
      <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
        android_ripple={{color: '#ddd'}}
        onPress={() => {
          setWeatherUnits({...weatherUnits, clock: CLOCK_12H}); setVisible(false);
        }}>
        <CheckBox checked={timeUnit===CLOCK_12H} color={theme.mainText}/>
        <Text style={[styles.themeEle, {color: theme.mainText}]}>12h clock</Text>
      </Pressable>
      <View style={{alignItems: 'flex-end'}}>
        <Pressable onPress={() => setVisible(false)}
          android_ripple={{color: '#ddd'}}>
          <Text style={{fontSize: 25, color: theme.mainText}}>cancel</Text>
        </Pressable>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  themeEle: {fontSize: 22, padding: 3},
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
    weatherUnits: state.weatherUnits,
  };
}

function mapDispatcherToProps(dispatch) {
  return {
    setWeatherUnits: (weatherUnits) => dispatch({type: 'WEATHER_UNITS', payload: weatherUnits}),
  };
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClockUnitModal);
