import React from 'react';
import {connect, Provider} from 'react-redux';
import { View, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MainPage from './MainPage';
import fetchRootForecast from './weather/api/ForecastApi';
import Geolocation from '@react-native-community/geolocation';
import getLocationDetails from "./location/LocationApi";
import CustomText from "./components/CustomText";
import LottieView from "lottie-react-native";
import GeneralStatusBar from "./components/GeneralStatusBar";
import InitLocationSearchComponent from "./location/InitLocationSearchComponent";

const ACTIVE_LOCATION_STORAGE = '@active_location';

class InitLoader extends React.Component {
  state = {
    isInitialForecastLoaded: false,
    isSearchLocationWindow: false,
    loadingState: 'Getting position...',

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
        return;
      }
    } catch (err) {
      console.log(err);
    }
    this.loadForecastUsingLocationInStorage()
  }

  async loadForecastWithGivenLocation(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await getLocationDetails(longitude, latitude);
    this.setState({loadingState: 'Loading forecast...'});
    this.loadInitialForecast(location)
  }

  async loadInitialForecast(location){
    let initialForecast = await fetchRootForecast(location.latitude, location.longitude);
    this.props.setInitialForecast(initialForecast, location);
    this.setState({isInitialForecastLoaded: true});
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
    console.log('need to show location search modal');
    this.setState({isSearchLocationWindow: true, loadingState: 'dupa'})
  }

  render() {
    return this.state.isInitialForecastLoaded ?
        (<MainPage />)
        :
        (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <GeneralStatusBar/>
          <LottieView
              style={{height: 200}}
              source={require('../../assets/lottie/loading')}
              autoPlay
              loop/>
          <CustomText style={{fontSize: 25}}>{this.state.loadingState}</CustomText>
          {this.state.isSearchLocationWindow &&
          <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', paddingTop: 20}}>
            <CustomText style={{fontSize: 25, marginHorizontal: 10, marginTop: 25}}>Tell us your location</CustomText>
            <InitLocationSearchComponent/>
          </View>}
        </View>);
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
    setInitialForecast: (rootForecast, location) => dispatch({type: 'ROOT_FORECAST', payload: {forecast: rootForecast, location: location}}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(InitLoader);
