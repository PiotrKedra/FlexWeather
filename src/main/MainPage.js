import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  Animated,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Text from '../main/components/CustomText';
import Header from './menu/Header';
import FooterMenu from './menu/FooterMenu';
import BasicWeatherPanel from './weather/BasicWeatherPanel';
import DayPickerList from './components/DayPickerList';
import HourlyTemperaturePanel from './weather/temperature/HourlyTemperaturePanel';
import HourlyForecastInfo from './weather/HourlyForecastInfo'

class MainPage extends React.Component {
  state = {
    scroll: false,
    fontLoaded: false,
    locationOpacity: new Animated.Value(1),
  };

  onScrollNotTopMinimizeHeader = event => {
    const y = event.nativeEvent.contentOffset.y;
    if (y >= 10 && this.state.scroll === false) {
      Animated.timing(this.state.locationOpacity, {
        toValue: 0,
        duration: 400,
      }).start();
      this.setState({ scroll: true });
    }
    if (y < 10 && this.state.scroll === true) {
      Animated.timing(this.state.locationOpacity, {
        toValue: 1,
        duration: 400,
      }).start();
      this.setState({ scroll: false });
    }
  };

  getCurrentForecast = () => {
    if (this.props.currentTimestamp !== 0) {
      let forecast = this.props.forecast;

      for (let daily of forecast) {
        if (daily.timestamp === this.props.currentTimestamp) {
          return daily;
        }
      }
    }
    return {
      temperature: 1,
      temperatureMin: 0,
      temperatureMax: 0,
      icon: 'clear',
      summary: 'error',
      timestamp: 0,
    };
  };

  render = () => {
    let locationStyle = {
      opacity: this.state.locationOpacity,
    };

    this.shouldDisplayHourlyCharts();

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../assets/images/background.jpg')}
        >
          <Header isScrool={this.state.scroll} />
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            onScroll={this.onScrollNotTopMinimizeHeader}
            nestedScrollEnabled={true}
          >
            <Animated.View style={[styles.locationView, locationStyle]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}
              >
                <Text style={{ fontSize: 25 }}>
                  {this.props.activeLocation.country}
                </Text>
                <Text style={{ fontSize: 50 }}>
                  {this.props.activeLocation.city}
                </Text>
              </View>
            </Animated.View>
            <DayPickerList />
            <BasicWeatherPanel forecastData={this.getCurrentForecast()} />
            {this.shouldDisplayHourlyCharts() ? <HourlyTemperaturePanel /> : <HourlyForecastInfo/>
            }
            <View
              style={{
                marginTop: 10,
                width: '90%',
                height: 300,
                backgroundColor: 'white',
                borderRadius: 20,
                marginBottom: 100,
              }}
            >
              <ScrollView
                style={{ flex: 1, paddingTop: 40, borderWidth: 1 }}
                horizontal={true}
              >
              </ScrollView>
            </View>
          </ScrollView>
          <FooterMenu />
        </ImageBackground>
      </View>
    );
  };

  shouldDisplayHourlyCharts = () => {
    let date = new Date(this.props.currentTimestamp * 1000);
    date.setDate(date.getDate() - 2);
    let today = new Date();
    return today.getTime() > date.getTime();
  }
}

function mapStateToProps(state) {
  return {
    activeLocation: state.activeLocation,
    days: state.days,
    forecast: state.rootForecastPerDay,
    currentTimestamp: state.currentTimestamp,
  };
}

export default connect(mapStateToProps)(MainPage);

const styles = StyleSheet.create({
  statusBarCover: {
    width: '100%',
    height: StatusBar.currentHeight,
    backgroundColor: '#FFAD94',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0000',
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    marginVertical: 8,
  },
});
