import React from 'react';
import {Image, View, StyleSheet, ImageBackground} from 'react-native';
import Text from '../components/CustomText';
import {FORECAST_ART} from "../../resource/ImagePath";
import Info from "./Info";

class BasicWeatherPanel extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View style={{paddingLeft: '5%', marginTop: 10, borderBottomWidth: 1, borderColor: 'rgba(66,66,66,0.5)'}}>
          <Text style={{fontSize: 30, color: 'rgb(33,33,33)'}}>Friday, 3 april</Text>
          <Text style={{fontSize: 24, color: 'rgba(33,33,33,0.6)'}}>{this.props.forecastData.summary}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 200}}>
          <ImageBackground
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: '#0000',
              }}
              source={require('../../../assets/images/art/sun3.png')}
          >
          <View style={{marginHorizontal: '5%', alignItems: 'flex-end', flexDirection: 'row'}}>
            <Text style={{ fontSize: 50, color: 'rgb(33,33,33)', textShadowColor: 'white', textShadowRadius: 1, textShadowOffset: {width: 2, height: 2}}}>
              {this.props.forecastData.temperature}°
            </Text>
            <Text style={{ fontSize: 20, color: 'rgba(33,33,33,1)' , textShadowColor: 'white', textShadowRadius: 1, textShadowOffset: {width: 1, height: 1}}}>
               |  {this.props.forecastData.temperatureMin}°/{this.props.forecastData.temperatureMax}°
            </Text>
          </View>
          </ImageBackground>
        </View>

        <Info/>
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
