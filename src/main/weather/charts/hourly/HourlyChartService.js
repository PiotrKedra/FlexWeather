import React from 'react';
import {ScrollView, View} from 'react-native';

import TemperatureChart from './svgcharts/TemperatureChart';
import WindChart from './svgcharts/WindChart';
import RainfallChart from './svgcharts/RainfallChart';
import {connect} from 'react-redux';

const ChartView = ({currentChart, hourlyForecast}) => {
  return hourlyForecast === undefined ?
        <View style={{height: 240}}/> :
        (
            <ScrollView horizontal={true}>
              {(currentChart === 'temperature') && <HourlyTemperatureChart hourlyForecast={hourlyForecast}/>}
              {(currentChart === 'wind') && <HourlyWindChart hourlyForecast={hourlyForecast}/>}
              {(currentChart === 'rainfall') && <HourlyRainfallChart hourlyForecast={hourlyForecast}/>}
            </ScrollView>
        );
};

const HourlyTemperatureChart = ({hourlyForecast}) => {
  let i = 0;
  return parseHourlyForecast(hourlyForecast).map((hourlyForecastPerDay) =>
    <TemperatureChart key={i++}
      data={hourlyForecastPerDay}
      dimensions={getDimensions(hourlyForecastPerDay.length)}
    />);
};

function HourlyWindChart({hourlyForecast}) {
  let i = 0;
  return parseHourlyForecast(hourlyForecast).map((hourlyForecastPerDay) =>
    <WindChart key={i++}
      data={hourlyForecastPerDay}
      dimensions={getDimensions(hourlyForecastPerDay.length, 80, 30)}
    />);
}

function HourlyRainfallChart({hourlyForecast}) {
  let i = 0;
  return parseHourlyForecast(hourlyForecast).map((hourlyForecastPerDay) =>
    <RainfallChart key={i++}
      data={hourlyForecastPerDay}
      dimensions={getDimensions(hourlyForecastPerDay.length)}
    />);
}

// todo mb keep this in state instead of 'hourlyForecast'
function parseHourlyForecast(hourlyForecast) {
  let currentDate = new Date(hourlyForecast[0].dt*1000).getDate();
  const hourlyForecastByDailyDate = [];
  let tmpArray = [];
  hourlyForecast.forEach((item) => {
    if (currentDate === new Date(item.dt*1000).getDate()) {
      tmpArray.push(item);
    } else {
      const tmpItem = Object.assign({}, item);
      tmpItem.dt = '23:59';
      tmpArray.push(tmpItem);
      hourlyForecastByDailyDate.push(tmpArray);
      currentDate = new Date(item.dt*1000).getDate();
      tmpArray = [item];
    }
  });
  hourlyForecastByDailyDate.push(tmpArray);
  return hourlyForecastByDailyDate;
}

function getDimensions(elementLength, graphHeight=70, initialYCordOfChart=60) {
  return {
    svgWidth: 80 * elementLength,
    svgHeight: 240,
    graphHeight: graphHeight,
    initialYCordOfChart: initialYCordOfChart,
  };
}

function mapStateToProps(state) {
  return {
    hourlyForecast: state.hourlyForecast,
  };
}

export default connect(mapStateToProps)(ChartView);
