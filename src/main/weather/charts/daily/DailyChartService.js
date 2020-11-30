import React from 'react';
import {ScrollView, View} from 'react-native';
import DailyGeneralChart from './svgcharts/DailyGeneralChart';
import DailyRainfallChart from './svgcharts/DailyRainfallChart';
import DailyUvIndexChart from './svgcharts/DailyUvIndexChart';
import DailyWindChart from './svgcharts/DailyWindChart';
import {connect} from 'react-redux';


const DailyChartService = ({currentChart, dailyForecast}) => {
  return dailyForecast === undefined ?
        <View style={{height: 300}}/> :
        (
            <ScrollView horizontal={true}>
              {currentChart==='general' && <DailyGeneralChart/>}
              {currentChart==='wind' && <DailyWindChart/>}
              {currentChart==='rainfall' && <DailyRainfallChart/>}
              {currentChart==='uv_index' && <DailyUvIndexChart/>}
            </ScrollView>
        );
};

function mapStateToProps(state) {
  return {
    dailyForecast: state.rootForecastPerDay,
  };
}

export default connect(mapStateToProps)(DailyChartService);
