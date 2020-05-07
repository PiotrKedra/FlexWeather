import React from 'react';
import { connect } from 'react-redux';
import { Text, View, PermissionsAndroid } from 'react-native';

import MainPage from './MainPage';
import fetchRootForecast from './weather/api/ForecastApi';
import Geolocation from '@react-native-community/geolocation';

class WeatherApp extends React.Component {
  state = {
    isRootForecastLoaded: false,
  };

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        console.log('granted biach');
        await Geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
            },
            (error) => alert(error.message),
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
        )
      } else {
        alert("Permission Denied");
      }
    } catch (err) {
      alert("err",err);
      console.warn(err)
    }
    // if(granted) {
    //   await Geolocation.getCurrentPosition(
    //       (position) => {
    //         console.log(position);
    //       },
    //       (error) => {
    //         // See error code charts below.
    //         console.log('error');
    //         console.log(error.code, error.message);
    //       },
    //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    //   );
    // }
    console.log('dupa');
    let rootForecast = await fetchRootForecast(50.1102653, 19.7615527);
    console.log(rootForecast.currentTimestamp);
    let entity = {
      rootForecastPerDay: rootForecast.rootForecast,
      currentTimestamp: rootForecast.currentTimestamp,
      days: rootForecast.days,
      hourlyForecast: rootForecast.hourlyForecast,
      navigation: this.props.navigation,
    };
    this.props.fontLoaded();
    this.props.loadInitialForecast(entity);
    this.setState({isRootForecastLoaded: true});
  }

  render() {
    return this.state.isRootForecastLoaded ? (
      <MainPage />
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 25}}>Data not loaded</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatcherToProps(dispatch) {
  return {
    loadInitialForecast: rootForecast => dispatch({type: 'ROOT_FORECAST', payload: rootForecast}),
    fontLoaded: () => dispatch({type: 'FONT_LOADED'}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(WeatherApp);
