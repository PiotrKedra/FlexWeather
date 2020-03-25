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
import LearnChart from './weather/temperature/LearnChart';

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

            <View
                style={{
                  marginTop: 10,
                  width: '95%',
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}
            >
              <Text style={{fontSize: 30, paddingLeft: '5%', color: 'rgb(33,33,33)', marginTop: 10}}>
                Hourly forecast
              </Text>
              <FlatList
                  style={{paddingLeft: '5%', borderBottomWidth: 1, borderColor: 'rgba(66,66,66,0.5)', paddingVertical: 10}}
                  horizontal={true}
                  data={[{value: 'temperature'}, {value: 'rainfall'}, {value: 'wind'}, {value: 'pressure'}]}
                  renderItem={(item) => (
                      <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}>
                        <Text style={{fontSize: 20}}>{item.item.value}</Text>
                      </TouchableOpacity>)}
                  keyExtractor={(item)=> (item.value)}
              />
              <ScrollView
                  horizontal={true}
              >
                <LearnChart />
              </ScrollView>
            </View>
            <View
              style={{
                marginTop: 10,
                width: '90%',
                height: 300,
                backgroundColor: 'white',
                borderRadius: 20,
              }}
            >
              <HourlyTemperaturePanel />
            </View>

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
                <LearnChart />
              </ScrollView>
            </View>
          </ScrollView>
          <FooterMenu />
        </ImageBackground>
      </View>
    );
  };
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
