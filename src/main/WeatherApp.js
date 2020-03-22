import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import MainPage from './MainPage';
import fetchRootForecast from './weather/api/ForecastApi';

class WeatherApp extends React.Component {
  state = {
    isRootForecastLoaded: false,
  };

  async componentDidMount() {
    let rootForecast = await fetchRootForecast(50.1102653, 19.7615527);
    let entity = {
      rootForecastPerDay: rootForecast.rootForecast,
      currentTimestamp: rootForecast.currentTimestamp,
      days: rootForecast.days,
      navigation: this.props.navigation,
    };
    console.log(entity);
    this.props.fontLoaded();
    this.props.loadInitialForecast(entity);
    this.setState({isRootForecastLoaded: true});
  }

  render() {
    return this.state.isRootForecastLoaded ? (
      <MainPage />
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 25}}>Data not loaded</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatcherToProps(dispatch) {
  return {
    loadInitialForecast: rootForecast =>
      dispatch({type: 'ROOT_FORECAST', payload: rootForecast}),
    fontLoaded: () => dispatch({type: 'FONT_LOADED'}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps,
)(WeatherApp);
