import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Text from '../components/CustomText';
import {FORECAST_ART} from "../../resource/ImagePath";

class BasicWeatherPanel extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View style={{paddingLeft: '5%', borderBottomWidth: 1, borderColor: 'rgba(66,66,66,0.5)',  marginTop: 10}}>
          <Text style={{fontSize: 30, color: 'rgb(33,33,33)'}}>Friday, 3 april</Text>
          <Text style={{fontSize: 24, color: 'rgba(33,33,33,0.6)'}}>{this.props.forecastData.summary}</Text>
        </View>
        <Image
            style={{width: 170, height: 220, position: 'absolute', top: 60, right: 20}}
            source={FORECAST_ART.clearDay}
        />
        <View style={{marginHorizontal: '5%'}}>
          <Text style={{ fontSize: 90, color: 'rgb(33,33,33)' }}>
            {this.props.forecastData.temperature}°
          </Text>
          <Text style={{ fontSize: 22, color: 'rgba(33,33,33,0.6)' }}>
            {this.props.forecastData.temperatureMin}°/{this.props.forecastData.temperatureMax}
          </Text>
          <Text style={{ fontSize: 22, color: 'rgba(33,33,33,0.6)' }}>
            Apparent {this.props.forecastData.apparentTemperatureMin}°/{this.props.forecastData.apparentTemperatureMax}
          </Text>
          <Text style={{ fontSize: 22, color: 'rgba(33,33,33,0.6)', marginTop: 20}}>
            There is {this.props.forecastData.precipProbability} chance for raining.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '95%',
    backgroundColor: 'rgb(244,244,244)',
    borderRadius: 20,
    elevation: 7
  },
  textView: {
    flex: 1,
    paddingHorizontal: '5%'
  },
  text: {
    fontSize: 23,
    marginVertical: 5
  }
});

export default BasicWeatherPanel;
