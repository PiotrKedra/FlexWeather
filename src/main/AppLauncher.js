import React from 'react';
import {connect} from 'react-redux';
import {View, PermissionsAndroid, Appearance} from 'react-native';
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
import {getDarkTheme, getLightTheme} from "./theme/Theme";

const ACTIVE_LOCATION_STORAGE = '@active_location';
const HOME_LOCATION_STORAGE = '@home_location';
const THEME_STORAGE = '@theme';

class AppLauncher extends React.Component {

  state = {
    isInitialForecastLoaded: false,
    noInternetConnection: false,
    afterFirstLaunch: false,
  };

  internetConnectionListener = async (state) => {
    if(this.state.afterFirstLaunch && state.isConnected && (await this.dataIsFresh())===false){
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
      if(this.props.route.params.saveHomeLocation){
        try {
          AsyncStorage.setItem(THEME_STORAGE, this.props.route.params.themeId);
        } catch (e) {
          console.log(e)
        }
        this.props.setTheme(this.props.route.params.theme);
      }
      this.loadForecastWithGivenLocation(this.props.route.params.location, this.props.route.params.saveHomeLocation);
      return;
    }
    //todo re think how this listener should works
    // const unsubscribe = NetInfo.addEventListener(this.internetConnectionListener);
    this.setTheme();
    try{
      const isStorage = await AsyncStorage.getItem('@active_location');
      if(isStorage === null){
        this.props.navigation.replace('WelcomeScreen');
      } else {
        this.normalAppLaunch();
      }
    } catch(e) {
      console.log(e);
    }
  };

  async setTheme(){
    try {
      const value = await AsyncStorage.getItem(THEME_STORAGE);
      switch (value) {
        case 'light':
          this.props.setTheme(getLightTheme());
          return;
        case 'dark':
          this.props.setTheme(getDarkTheme());
          return;
        default:
          this.props.setTheme(this.getSystemTheme());
      }
    } catch (e) {
      console.log(e);
    }
  }

  getSystemTheme(){
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark')
      return getDarkTheme();
    else
      return getLightTheme();
  }

  async normalAppLaunch(){
    if(await this.dataIsFresh()){
      await this.showForecastFromStorage();
    } else {
      if(await this.isInternetConnection()){
        this.tryToLoadDataFromInternet();
      }
    }
  }

  async dataIsFresh() {
    try {
      const lastUpdate = await AsyncStorage.getItem('@forecast_update_date');
      return (new Date() - new Date(JSON.parse(lastUpdate))) < 3600000;
    } catch (e) {
      return false;
    }
  }

  async isInternetConnection() {
    return await NetInfo.fetch().then(state => state.isConnected);
  }

  async tryToLoadDataFromInternet() {

    try {
      if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
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
    const weatherTheme = getThemeEntity(initialForecast);
    await this.props.setInitialForecast(initialForecast, location, weatherTheme);
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
    this.props.navigation.replace('SetupScreen');
  }

  async showForecastFromStorage() {
    const activeLocation = await AsyncStorage.getItem('@active_location');
    const lastForecast = JSON.parse(await AsyncStorage.getItem('@last_forecast'));
    const weatherTheme = getThemeEntity(lastForecast);
    this.props.setInitialForecast(lastForecast, JSON.parse(activeLocation), weatherTheme, false);
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
    setTheme: (theme) => dispatch({type: 'THEME', payload: theme}),
    setInitialForecast: (rootForecast, location, weatherTheme, saveToStorage=true) => dispatch({type: 'ROOT_FORECAST', payload: {forecast: rootForecast, location: location, weatherTheme: weatherTheme, saveToStorage: saveToStorage}}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(AppLauncher);
