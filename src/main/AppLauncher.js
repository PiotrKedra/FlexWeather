import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import fetchRootForecast from './weather/api/ForecastApi';
import GeneralStatusBar from "./components/GeneralStatusBar";
import getWeatherTheme from "./theme/ThemeService";
import NoInternetConnectionComponent from "./components/NoInternetConnectionComponent";
import getStorageTheme from "./theme/Theme";
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import getLocation from "./location/LocationService";
import hasDistanceChanged from "./location/DistanceCalculator";
import LauncherLoadingComponent from "./components/LauncherLoadingComponent";

setJSExceptionHandler((error, isFatal) => {
  console.log('### IS FATAL ERROR: ' + isFatal);
  console.log(error);
}, true);

setNativeExceptionHandler((error) => {
  alert(error);
});

class AppLauncher extends React.Component {

  state = {
    isInitialForecastLoaded: false,
    noInternetConnection: false,
    afterFirstLaunch: false,
  };

  componentDidMount = async () => {
    //todo re think how this listener should works
    // const unsubscribe = NetInfo.addEventListener(this.internetConnectionListener);
    await this.setTheme();
    if(await this.isStorageClear())
      this.props.navigation.replace('WelcomeScreen');
    else
      await this.normalAppLaunch();
  };

  async setTheme(){
    this.props.setTheme(await getStorageTheme());
  }

  async isStorageClear(){
    try {
      const isStorage = await AsyncStorage.getItem('@active_location');
      return isStorage === null;
    } catch (e){
      return true;
    }
  }

  async normalAppLaunch(){
    const location = await this.getProperLocation();
    if (await this.shouldLoadDataFromStorage(location))
      await this.showForecastFromStorage(location);
    else
      await this.tryToLoadDataFromInternet(location);
    this.props.setWeatherUnits(JSON.parse(await AsyncStorage.getItem('@weather_units')));
  }

  async getProperLocation(){
    if(this.props.route.params)
      return this.props.route.params.location;
    return await getLocation();
  }

  async shouldLoadDataFromStorage(location) {
    return await this.dataIsFresh() && await hasDistanceChanged(location);
  }

  async dataIsFresh() {
    const lastUpdate = await AsyncStorage.getItem('@forecast_update_date');
    if(!lastUpdate)
      return false;
    const lastUpdateDate = new Date(JSON.parse(lastUpdate));
    return (new Date() - lastUpdateDate) < 3600000;
  }

  async showForecastFromStorage(location) {
    const lastForecast = JSON.parse(await AsyncStorage.getItem('@last_forecast'));
    const weatherTheme = getWeatherTheme(lastForecast);
    this.props.setInitialForecast(lastForecast, JSON.parse(location), weatherTheme, false);
    this.props.navigation.replace('MainPage')
  }

  async tryToLoadDataFromInternet(location) {
    const forecast = await fetchRootForecast(location.latitude, location.longitude);
    const weatherTheme = getWeatherTheme(forecast);
    await this.props.setInitialForecast(forecast, location, weatherTheme);
    this.props.navigation.replace('MainPage')
  }

  // internetConnectionListener = async (state) => {
  //   if(this.state.afterFirstLaunch && state.isConnected && (await this.dataIsFresh())===false){
  //     try {
  //       const value = await AsyncStorage.getItem(ACTIVE_LOCATION_STORAGE);
  //       if(value !== null) {
  //         const location = JSON.parse(value);
  //         await this.loadInitialForecast(location);
  //         return;
  //       }
  //     } catch(e) {
  //       console.log(e);
  //     }
  //   }
  //   this.setState({afterFirstLaunch: true})
  // };
  //
  // async isInternetConnection() {
  //   return await NetInfo.fetch().then(state => state.isConnected);
  // }
  //
  // async loadInitialForecast(location){
  //   let initialForecast = await fetchRootForecast(location.latitude, location.longitude);
  //   const weatherTheme = getWeatherTheme(initialForecast);
  //   await this.props.setInitialForecast(initialForecast, location, weatherTheme);
  //   this.props.navigation.replace('MainPage')
  // }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#2C82C9'}}>
        <GeneralStatusBar opacity={0}/>
        <LauncherLoadingComponent/>
        <NoInternetConnectionComponent/>
      </View>)
  }
}

function mapDispatcherToProps(dispatch) {
  return {
    setTheme: (theme) => dispatch({type: 'THEME', payload: theme}),
    setInitialForecast: (rootForecast, location, weatherTheme, saveToStorage=true) => dispatch({type: 'ROOT_FORECAST', payload: {forecast: rootForecast, location: location, weatherTheme: weatherTheme, saveToStorage: saveToStorage}}),
    setWeatherUnits: (weatherUnits) => dispatch({type: 'WEATHER_UNITS', payload: weatherUnits}),
  };
}

export default connect(
    null,
    mapDispatcherToProps,
)(AppLauncher);
