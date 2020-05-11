import React from 'react';
import { connect } from 'react-redux';
import { Text, View, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MainPage from './MainPage';
import fetchRootForecast from './weather/api/ForecastApi';
import Geolocation from '@react-native-community/geolocation';
import getLocationDetails from "./location/LocationApi";

const ACTIVE_LOCATION_STORAGE = '@active_location';

class InitLoader extends React.Component {
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
        await Geolocation.getCurrentPosition(
            (position) => this.loadForecastWithGivenLocation(position),
            (error) => {
              //if location is disabled, but permission is granted
              console.log(error);
              this.loadForecastUsingLocationInStorage();},
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
        );
      } else this.loadForecastUsingLocationInStorage();
    } catch (err) {
      console.log(err);
      this.loadForecastUsingLocationInStorage();
    }
  }

  async loadForecastWithGivenLocation(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await getLocationDetails(longitude, latitude);
    this.saveLocation(location);
    this.loadInitialForecast(latitude, longitude)
  }

  saveLocation(location) {
    this.props.setActiveLocation(location);
    try {
      AsyncStorage.setItem(ACTIVE_LOCATION_STORAGE, JSON.stringify(location));
    } catch (e) {
      console.log(e);
    }
  }

  async loadInitialForecast(latitude, longitude){
    let initialForecast = await fetchRootForecast(latitude, longitude);
    this.props.setInitialForecast(initialForecast);
    this.setState({isInitialForecastLoaded: true});
  }

  async loadForecastUsingLocationInStorage(){
    try {
      const value = await AsyncStorage.getItem(ACTIVE_LOCATION_STORAGE);
      if(value !== null) {
        const location = JSON.parse(value);
        this.loadInitialForecast(location.latitude, location.longitude);
        this.props.setActiveLocation(location);
      }
    } catch(e) {
      console.log(e);
      //todo add location search modal or sth
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
    setInitialForecast: rootForecast => dispatch({type: 'ROOT_FORECAST', payload: rootForecast}),
    fontLoaded: () => dispatch({type: 'FONT_LOADED'}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(InitLoader);
