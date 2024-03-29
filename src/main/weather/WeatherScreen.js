import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity, BackHandler, RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';

import Text from '../components/CustomText';
import AnimatedMenu from '../menu/AnimatedMenu';
import GeneralStatusBar from '../components/GeneralStatusBar';
import PoweredBy from '../components/PoweredBy';
import WeatherPanels from './WeatherPanels';
import NoInternetConnectionComponent from '../components/NoInternetConnectionComponent';
import fetchRootForecast from './api/ForecastApi';
import getWeatherTheme from '../theme/ThemeService';

class WeatherScreen extends React.Component {
  state = {
    scroll: false,
    fontLoaded: false,
    locationLeftPosition: new Animated.Value(Dimensions.get('window').width*0.03),
    refreshing: false,
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => false);
  }

  onScrollNotTopMinimizeHeader = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y >= 10 && this.state.scroll === false) {
      Animated.timing(this.state.locationLeftPosition, {
        toValue: -200,
        duration: 400,
        useNativeDriver: false,
      }).start();
      this.setState({scroll: true});
    }
    if (y < 10 && this.state.scroll === true) {
      Animated.timing(this.state.locationLeftPosition, {
        toValue: Dimensions.get('window').width*0.03,
        duration: 400,
        useNativeDriver: false,
      }).start();
      this.setState({scroll: false});
    }
  };

  async refresh() {
    this.setState({refreshing: true});
    const forecast = await fetchRootForecast(this.props.activeLocation.latitude, this.props.activeLocation.longitude);
    await this.props.refreshForecast(forecast, getWeatherTheme(forecast));
    this.setState({refreshing: false});
  }

  render = () => {
    const locationStyle = {
      position: 'absolute',
      top: 0,
      left: this.state.locationLeftPosition,
    };

    this.shouldDisplayHourlyCharts();
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={styles.imageBackground}
          source={this.props.weatherTheme.background}
        >
          <GeneralStatusBar/>
          <ScrollView
            contentContainerStyle={{alignItems: 'center', paddingTop: 50}}
            onScroll={this.onScrollNotTopMinimizeHeader}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing}
                onRefresh={()=> this.refresh()}
                colors={[this.props.weatherTheme.mainColor]}
                progressBackgroundColor={this.props.theme.mainColor}
                progressViewOffset={75}
              />
            }
          >
            <Animated.View style={[styles.locationView, locationStyle]}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingTop: 10,
                }}
                onPress={() => this.props.navigation.navigate('SearchScreen', {saveHomeLocation: false})}
              >
                <Image
                  style={
                    {
                      width: 26,
                      height: 26,
                      marginBottom: 2,
                      marginRight: 5,
                      tintColor: this.props.weatherTheme.textColor,
                    }
                  }
                  source={require('../../../assets/images/icons/location-marker.png')}/>
                <Text style={{fontSize: 30, color: this.props.weatherTheme.textColor}}>
                  {this.props.activeLocation.city}
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <WeatherPanels/>
            <View style={{flexDirection: 'row', marginHorizontal: '4%', marginVertical: 5}}>
              <PoweredBy weatherTheme={this.props.weatherTheme}/>
            </View>
          </ScrollView>
          <AnimatedMenu
            isScroll={this.state.scroll}
            weatherTheme={this.props.weatherTheme}
            location={this.props.activeLocation.city}
            navigation={this.props.navigation}/>
          <NoInternetConnectionComponent/>
        </ImageBackground>
      </View>
    );
  };

  shouldDisplayHourlyCharts = () => {
    const date = new Date(this.props.currentTimestamp * 1000);
    date.setDate(date.getDate() - 2);
    const today = new Date();
    return today.getTime() > date.getTime();
  }
}

function mapStateToProps(state) {
  return {
    activeLocation: state.activeLocation,
    weatherTheme: state.weatherTheme,
    theme: state.theme,
  };
}

function mapDispatcherToProps(dispatch) {
  return {
    refreshForecast: (forecast, weatherTheme) =>
      dispatch({type: 'FORECAST_REFRESH', payload: {forecast: forecast, weatherTheme: weatherTheme}}),
  };
}

export default connect(mapStateToProps, mapDispatcherToProps)(WeatherScreen);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationView: {
    flexDirection: 'row',
  },
});
