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

  async doShit(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = 'http://photon.komoot.de/reverse?lon=' + longitude + '&lat=' + latitude + '&lang=en';
    const response = await fetch(url);
    const locationDetails = await response.json();
    const location = {
      longitude: longitude,
      latitude: latitude,
      city: locationDetails.features[0].properties.city,
      country: locationDetails.features[0].properties.country,
    };

    this.props.setActiveLocation(location);
    this.props.fontLoaded();
    this.loadInitialForecast(latitude, longitude)
  }

  async loadInitialForecast(latitude, longitude){
    let rootForecast = await fetchRootForecast(latitude, longitude);
    let entity = {
      rootForecastPerDay: rootForecast.rootForecast,
      currentTimestamp: rootForecast.currentTimestamp,
      days: rootForecast.days,
      hourlyForecast: rootForecast.hourlyForecast,
      navigation: this.props.navigation,
    };
    this.props.loadInitialForecast(entity);
    this.setState({isRootForecastLoaded: true});
  }

  loadForecastWithinLocationInStorage(){
    console.log("location in storage");
    if(this.props.activeLocation) {
      console.log('active location');
      this.props.loadInitialForecast(this.props.activeLocation.latitude, this.props.activeLocation.longitude);
    }
    if(this.props.homeLocation) {
      console.log('home location');
      this.props.loadInitialForecast(this.props.homeLocation.latitude, this.props.homeLocation.longitude);
      this.props.setActiveLocation(this.props.homeLocation);
    }
    console.log('should redirect to search location window, because no location was found')
  }

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
        await Geolocation.getCurrentPosition(
            (position) => this.doShit(position),
            (error) =>
                //if location is disabled, but permission is granted
                this.loadForecastWithinLocationInStorage(),
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
        );

      } else {
        this.loadForecastWithinLocationInStorage();
      }
    } catch (err) {
      alert("err2",err);
      console.warn(err)
    }
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
  return {
    activeLocation: state.activeLocation,
    homeLocation: state.homeLocation,

  };
}

function mapDispatcherToProps(dispatch) {
  return {
    setActiveLocation: activeLocation => dispatch({type: 'ACTIVE_LOCATION', payload: activeLocation}),
    loadInitialForecast: rootForecast => dispatch({type: 'ROOT_FORECAST', payload: rootForecast}),
    fontLoaded: () => dispatch({type: 'FONT_LOADED'}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(WeatherApp);
