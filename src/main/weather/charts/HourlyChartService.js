import React from "react";
import {ScrollView} from "react-native";

import TemperatureChart from "./svgcharts/TemperatureChart";
import WindChart from "./svgcharts/WindChart";
import RainfallChart from "./svgcharts/RainfallChart";

const ChartView = (props) => {
    return  (
        <ScrollView horizontal={true}>
            {(props.currentChart === 'temperature') && <HourlyTemperatureChart hourlyForecast={props.hourlyForecast} weatherTheme={props.weatherTheme}/>}
            {(props.currentChart === 'wind') && <HourlyWindChart hourlyForecast={props.hourlyForecast}/>}
            {(props.currentChart === 'rainfall') && <HourlyRainfallChart hourlyForecast={props.hourlyForecast}/>}
        </ScrollView>
    )
};

const HourlyTemperatureChart = (props) => {
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <TemperatureChart key={i++}
                          data={hourlyForecastPerDay}
                          dimensions={getDimensions(hourlyForecastPerDay.length)}
                          weatherTheme={props.weatherTheme}
        />)
};

function HourlyWindChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <WindChart key={i++}
                   data={hourlyForecastPerDay}
                   dimensions={getDimensions(hourlyForecastPerDay.length, 80, 30)}
        />)
}

function HourlyRainfallChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <RainfallChart key={i++}
                       data={hourlyForecastPerDay}
                       dimensions={getDimensions(hourlyForecastPerDay.length)}
        />)
}

//todo mb keep this in state instead of 'hourlyForecast'
function parseHourlyForecast(hourlyForecast) {
    let currentDate = new Date(hourlyForecast[0].dt*1000).getDate();
    let hourlyForecastByDailyDate = [];
    let tmpArray = [];
    hourlyForecast.forEach(item => {
        if (currentDate === new Date(item.dt*1000).getDate()) {
            tmpArray.push(item);
        } else {
            let tmpItem = Object.assign({}, item);
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
    }
}

export default ChartView;
