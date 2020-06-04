import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import Text from '../main/components/CustomText';
import AnimatedMenu from './menu/AnimatedMenu';
import RootWeatherPanel from './weather/rootpanel/RootWeatherPanel';
import DayPickerList from './components/DayPickerList';
import HourlyForecastInfo from './weather/charts/info/HourlyForecastInfo'
import DetailsPanel from "./weather/detailpanel/DetailPanel";
import HourlyForecastPanel from "./weather/charts/HourlyForecastPanel";
import GeneralStatusBar from "./components/GeneralStatusBar";
import PoweredBy from "./components/PoweredBy";
import WeekViewComponent from "./WeekViewComponent";

class MainPage extends React.Component {
  state = {
    scroll: false,
    fontLoaded: false,
    locationOpacity: new Animated.Value(1),
    isWeakView: true,
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

  getTodayForecast() {
    return (this.props.forecast)
  }

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
          source={this.props.theme.background}
          imageStyle={{resizeMode: 'repeat'}}
        >
          <GeneralStatusBar/>
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            onScroll={this.onScrollNotTopMinimizeHeader}
            nestedScrollEnabled={true}
          >
            <Animated.View style={[styles.locationView, locationStyle]}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingTop: 10
                }}
              >
                <Image style={{width: 26, height: 26, marginBottom: 2, marginRight: 5}} source={require('../../assets/images/icons/location-marker.png')}/>
                <Text style={{fontSize: 30}}>
                  {this.props.activeLocation.city}
                </Text>
              </View>
            </Animated.View>
            {this.state.isWeakView ? <WeekViewComponent currentForecast={this.props.currentForecast}
                                                        todayForecast={this.getTodayForecast()}
                                                        theme={this.props.theme}
                /> :
                <React.Fragment>
                  <DayPickerList/>
                  <RootWeatherPanel forecast={this.getCurrentForecast()} />
                  {this.shouldDisplayHourlyCharts() ? <HourlyForecastPanel /> : <HourlyForecastInfo/>}
                  <DetailsPanel/>
                </React.Fragment>
            }
            <PoweredBy/>
          </ScrollView>
          <AnimatedMenu isScroll={this.state.scroll} theme={this.props.theme}/>

          {/*<FooterMenu />*/}
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
    currentForecast: state.currentForecast,
    activeLocation: state.activeLocation,
    days: state.days,
    forecast: state.rootForecastPerDay,
    currentTimestamp: state.currentTimestamp,
    theme: state.theme
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
    paddingHorizontal: '4%',
  },
});
