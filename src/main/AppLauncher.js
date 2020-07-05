import React from 'react';
import {connect} from 'react-redux';
import {View, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

import fetchRootForecast from './weather/api/ForecastApi';
import Geolocation from '@react-native-community/geolocation';
import getLocationDetails from "./location/LocationApi";
import GeneralStatusBar from "./components/GeneralStatusBar";
import getThemeEntity from "./theme/ThemeService";
import LoadingComponent from "./components/LoadingComponent";
import NoInternetConnectionComponent from "./components/NoInternetConnectionComponent";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

const ACTIVE_LOCATION_STORAGE = '@active_location';
const HOME_LOCATION_STORAGE = '@home_location';

class AppLauncher extends React.Component {

  state = {
    isInitialForecastLoaded: false,
    noInternetConnection: false,
    afterFirstLaunch: false,
  };

  internetConnectionListener = async (state) => {
    if(this.state.afterFirstLaunch && state.isConnected && await this.dataIsNotFresh()){
      try {
        const value = await AsyncStorage.getItem(ACTIVE_LOCATION_STORAGE);
        if(value !== null) {
          const location = JSON.parse(value);
          this.loadInitialForecast(location);
          return;
        }
      } catch(e) {
        console.log(e);
      }
    }
    this.setState({afterFirstLaunch: true})
  };

  componentDidMount = async () => {
    if(this.props.route.params){
      this.loadForecastWithGivenLocation(this.props.route.params.location, this.props.route.params.saveHomeLocation);
      return;
    }
    //todo re think how this listener should works
    // const unsubscribe = NetInfo.addEventListener(this.internetConnectionListener);
    try{
      const isStorage = await AsyncStorage.getItem('@active_location');
      if(isStorage === null){
        this.props.navigation.replace('FirstAppLaunch');
      } else {
        this.normalAppLaunch();
      }
    } catch(e) {
      console.log(e);
    }
  };

  async normalAppLaunch(){
    if(await this.dataIsNotFresh()){
      if(await this.isInternetConnection()){
        this.tryToLoadDataFromInternet();
      }
    } else {
      await this.showForecastFromStorage();
    }
  }

  async dataIsNotFresh() {
    try {
      const lastUpdate = await AsyncStorage.getItem('@forecast_update_date').then(date => new Date(JSON.parse(date)));
      return (new Date() - lastUpdate) > 3600000;
    } catch (e) {
      return true;
    }
  }

  async isInternetConnection() {
    return await NetInfo.fetch().then(state => state.isConnected);
  }

  async tryToLoadDataFromInternet() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(() => {
              Geolocation.getCurrentPosition(
                  (position) => this.loadForecastWithGivenPosition(position),
                  (error) => {
                    console.log(error);
                    this.loadForecastUsingLocationInStorage();
                  },
                  {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
              );
            })
      } else {
        this.loadForecastUsingLocationInStorage();
      }
    } catch (err) {
      this.loadForecastUsingLocationInStorage();
      console.log(err);
    }
  }

  async loadForecastWithGivenLocation(location, saveHomeLocation=false){
    if(saveHomeLocation) this.saveHomeLocation(location);
    this.loadInitialForecast(location)
  }

  async loadForecastWithGivenPosition(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await getLocationDetails(longitude, latitude);
    this.loadInitialForecast(location)
  }

  saveHomeLocation(location){
      try {
          AsyncStorage.setItem(HOME_LOCATION_STORAGE, JSON.stringify(location));
      } catch (e) {
          console.log(e);
      }
  }

  async loadInitialForecast(location){
    let initialForecast = await fetchRootForecast(location.latitude, location.longitude);
    const theme = getThemeEntity(initialForecast);
    await this.props.setInitialForecast(initialForecast, location, theme);
    this.props.navigation.replace('MainPage')
  }

  async loadForecastUsingLocationInStorage(){
    try {
      const value = await AsyncStorage.getItem(ACTIVE_LOCATION_STORAGE);
      if(value !== null) {
        const location = JSON.parse(value);
        this.loadInitialForecast(location);
        return;
      }
    } catch(e) {
      console.log(e);
    }
    this.props.navigation.replace('FirstAppLaunch');
  }

  async showForecastFromStorage() {
    const activeLocation = await AsyncStorage.getItem('@active_location');
    const lastForecast = JSON.parse(await AsyncStorage.getItem('@last_forecast'));
    const theme = getThemeEntity(lastForecast);
    this.props.setInitialForecast(lastForecast, JSON.parse(activeLocation), theme, false);
    this.props.navigation.replace('MainPage')
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#2C82C9'}}>
        <GeneralStatusBar/>
        <LoadingComponent loading={true}/>
        <NoInternetConnectionComponent/>
      </View>)
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
    setInitialForecast: (rootForecast, location, theme, saveToStorage=true) => dispatch({type: 'ROOT_FORECAST', payload: {forecast: rootForecast, location: location, theme: theme, saveToStorage: saveToStorage}}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(AppLauncher);
