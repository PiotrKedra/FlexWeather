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
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Text from '../main/components/CustomText';
import AnimatedMenu from './menu/AnimatedMenu';
import GeneralStatusBar from "./components/GeneralStatusBar";
import PoweredBy from "./components/PoweredBy";
import WeatherViewComponent from "./WeatherViewComponent";
import RefreshInfo from "./components/RefreshInfo";
import NoInternetConnectionComponent from "./components/NoInternetConnectionComponent";

class MainPage extends React.Component {
  state = {
    scroll: false,
    fontLoaded: false,
    locationLeftPosition: new Animated.Value(Dimensions.get('window').width*0.03)
  };

  onScrollNotTopMinimizeHeader = event => {
    const y = event.nativeEvent.contentOffset.y;
    if (y >= 10 && this.state.scroll === false) {
      Animated.timing(this.state.locationLeftPosition, {
        toValue: -200,
        duration: 400,
      }).start();
      this.setState({ scroll: true });
    }
    if (y < 10 && this.state.scroll === true) {
      Animated.timing(this.state.locationLeftPosition, {
        toValue: Dimensions.get('window').width*0.03,
        duration: 400,
      }).start();
      this.setState({ scroll: false });
    }
  };

  render = () => {
    let locationStyle = {
      position: 'absolute',
      top: 0,
      left: this.state.locationLeftPosition
    };

    this.shouldDisplayHourlyCharts();
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.imageBackground}
          source={this.props.theme.background}
        >
          <GeneralStatusBar/>

          <ScrollView
            contentContainerStyle={{alignItems: 'center', paddingTop: 50}}
            onScroll={this.onScrollNotTopMinimizeHeader}
            nestedScrollEnabled={true}
          >
            <Animated.View style={[styles.locationView, locationStyle]}>
              <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingTop: 10
                  }}
                  onPress={() => this.props.navigation.navigate('SearchScreen', {saveHomeLocation: false})}
              >
                <Image style={{width: 26, height: 26, marginBottom: 2, marginRight: 5, tintColor: this.props.theme.textColor}} source={require('../../assets/images/icons/location-marker.png')}/>
                <Text style={{fontSize: 30, color: this.props.theme.textColor}}>
                  {this.props.activeLocation.city}
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <WeatherViewComponent currentForecast={this.props.currentForecast}
                                  todayForecast={this.props.forecast}
                                  theme={this.props.theme}
            />
            <View style={{flexDirection: 'row', marginHorizontal: '4%', marginVertical: 5}}>
              <PoweredBy theme={this.props.theme}/>
              <RefreshInfo theme={this.props.theme}/>
            </View>
          </ScrollView>
          <AnimatedMenu isScroll={this.state.scroll} theme={this.props.theme} location={this.props.activeLocation.city} navigation={this.props.navigation}/>
          <NoInternetConnectionComponent/>
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
    theme: state.theme
  };
}

export default connect(mapStateToProps)(MainPage);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationView: {
    flexDirection: 'row',
  },
});
