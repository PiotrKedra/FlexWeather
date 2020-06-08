import React from 'react';
import {connect, Provider} from 'react-redux';
import {View, PermissionsAndroid, Animated, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

import MainPage from './MainPage';
import fetchRootForecast from './weather/api/ForecastApi';
import Geolocation from '@react-native-community/geolocation';
import getLocationDetails from "./location/LocationApi";
import CustomText from "./components/CustomText";
import LottieView from "lottie-react-native";
import NoInternetConnectionComponent from "./components/NoInternetConnectionComponent";
import AnimatedInitLocationSearchComponent from "./location/AnimatedInitLocationSearchComponent";
import GeneralStatusBar from "./components/GeneralStatusBar";
import getThemeEntity from "./theme/ThemeService";
import AnimatedInitText from "./AnimatedInitText";

const ACTIVE_LOCATION_STORAGE = '@active_location';
const HOME_LOCATION_STORAGE = '@home_location';

class InitLoader extends React.Component {

  state = {
    isInitialForecastLoaded: false,
    isSearchLocationWindow: false,
    loadingState: 'Getting position...',
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
    console.log('dont need to reload data');
    this.setState({afterFirstLaunch: true})
  };

  componentDidMount = async () => {
    if(this.props.route.params){
      this.loadForecastWithGivenLocation(this.props.route.params.position, this.props.route.params.saveHomeLocation);
      return
    }
    const unsubscribe = NetInfo.addEventListener(this.internetConnectionListener);
    try{
      const isStorage = await AsyncStorage.getItem('@active_location');
      if(isStorage === null){
        // first app launch -> load from internet
        //this.firstAppLaunchForecastLoading();

        this.props.navigation.replace('FirstAppLaunch');


      } else {
        this.normalAppLaunch();
      }
    } catch(e) {
      console.log(e);
    }
  };

  async firstAppLaunchForecastLoading(){
    if(this.isInternetConnection()){
      await this.firstForecastLaunch();
    } else {
        // no internet -> do nothing (need internet for first launch)
        this.setState({loadingState: 'Need internet for first launch.'})
    }
  }

  async isInternetConnection() {
    return await NetInfo.fetch().then(state => state.isConnected);
  }

  async firstForecastLaunch() {
    // get current location and load forecast using it
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await Geolocation.getCurrentPosition(
            (position) => this.loadForecastWithGivenLocation(position, true),
            (error) => this.setState({isSearchLocationWindow: true}),
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
        );
        return;
      }
    } catch (err) {
      console.log(err);
    }
    // if couldn't get location -> load search component
    this.setState({isSearchLocationWindow: true});
  }

  async normalAppLaunch(){
    // load forecast from internet, if no then from storage
    if(await this.dataIsNotFresh()){
      if(await this.isInternetConnection()){
        await this.tryToLoadDataFromInternet();
        return;
      }
    }
    await this.showForecastFromStorage();
  }

  async dataIsNotFresh() {
    try {
      const lastUpdate = await AsyncStorage.getItem('@forecast_update_date').then(date => new Date(JSON.parse(date)));
      return (new Date() - lastUpdate) > 3600000;
    } catch (e) {
      return true;
    }
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
        await Geolocation.getCurrentPosition(
            (position) => this.loadForecastWithGivenLocation(position),
            (error) => {console.log(error); this.loadForecastUsingLocationInStorage();},
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
        );
        return;
      }
    } catch (err) {
      console.log(err);
    }
    this.loadForecastUsingLocationInStorage();
  }

  async loadForecastWithGivenLocation(position, saveHomeLocation=false){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await getLocationDetails(longitude, latitude);
    if(saveHomeLocation) this.saveHomeLocation(location);
    this.setState({loadingState: 'Loading forecast...'});
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
    this.props.setInitialForecast(initialForecast, location, theme);
    //this.setState({isInitialForecastLoaded: true});
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

    // navigate to search component
    this.setState({isSearchLocationWindow: true})
  }

  async showForecastFromStorage() {
    const activeLocation = await AsyncStorage.getItem('@active_location');
    const lastForecast = JSON.parse(await AsyncStorage.getItem('@last_forecast'));
    const theme = getThemeEntity(lastForecast);
    this.props.setInitialForecast(lastForecast, JSON.parse(activeLocation), theme, false);

    //this.setState({isInitialForecastLoaded: true});
    this.props.navigation.replace('MainPage')
  }

  loadForecastFromSearchComponent = async (location) => {
    const locationEntity = {
      longitude: location.geometry.coordinates[0],
      latitude: location.geometry.coordinates[1],
      city: location.properties.name,
      country: location.properties.country,
    };
    this.saveHomeLocation(locationEntity);
    this.setState({isSearchLocationWindow: false, loadingState: 'Loading forecast...'});
    this.loadInitialForecast(locationEntity)
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#2C82C9'}}>
        <GeneralStatusBar/>
        {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C82C9'}}>*/}
        {/*  */}
        {/*  /!*<LottieView*!/*/}
        {/*  /!*    style={{height: 200}}*!/*/}
        {/*  /!*    source={require('../../assets/lottie/loading')}*!/*/}
        {/*  /!*    autoPlay*!/*/}
        {/*  /!*    loop/>*!/*/}
        {/*  /!*<CustomText style={{fontSize: 25}}>{this.state.loadingState}</CustomText>*!/*/}
        {/*  /!*<AnimatedInitLocationSearchComponent isSearchLocationWindow={this.state.isSearchLocationWindow}*!/*/}
        {/*  /!*                                     loadForecastFromSearchComponent={this.loadForecastFromSearchComponent}/>*!/*/}
        {/*</View>)*/}
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
)(InitLoader);
