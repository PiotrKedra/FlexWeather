import React from "react";
import {ScrollView} from "react-native";

import TemperatureChart from "./svgcharts/TemperatureChart";
import WindChart from "./svgcharts/WindChart";
import RainfallChart from "./svgcharts/RainfallChart";
import UvIndexChart from "./svgcharts/UvIndexChart";

const ChartView = (props) => {
    return  (
        <ScrollView horizontal={true}>
            {(props.currentChart === 'temperature') && <HourlyTemperatureChart hourlyForecast={props.hourlyForecast}/>}
            {(props.currentChart === 'wind') && <HourlyWindChart hourlyForecast={props.hourlyForecast}/>}
            {(props.currentChart === 'rainfall') && <HourlyRainfallChart hourlyForecast={props.hourlyForecast}/>}
            {(props.currentChart === 'uv_index') && <HourlyUvIndexChart hourlyForecast={props.hourlyForecast}/>}
        </ScrollView>
    )
};

const HourlyTemperatureChart = (props) => {
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <TemperatureChart key={i++}
                          data={hourlyForecastPerDay}
                          dimensions={getDimensions(hourlyForecastPerDay.length)}
        />)
};

function HourlyWindChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <WindChart key={i++}
                       data={hourlyForecastPerDay}
                       dimensions={getDimensions(hourlyForecastPerDay.length, )}
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

function HourlyUvIndexChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <UvIndexChart key={i++}
                      data={hourlyForecastPerDay}
                      dimensions={getDimensions(hourlyForecastPerDay.length, 100)}
        />)
}

//todo mb keep this in state instead of 'hourlyForecast'
function parseHourlyForecast(hourlyForecast) {
    let currentDate = new Date(hourlyForecast[0].timeObject.timestamp * 1000).getDate();
    let hourlyForecastByDailyDate = [];
    let tmpArray = [];
    hourlyForecast.forEach(item => {
        if ( currentDate === new Date(item.timeObject.timestamp * 1000).getDate()) {
            tmpArray.push(item);
        } else {
            let tmpItem = Object.assign({}, item);
            tmpItem.time = '23:59';
            tmpArray.push(tmpItem);
            hourlyForecastByDailyDate.push(tmpArray);
            currentDate = new Date(item.timeObject.timestamp * 1000).getDate();
            tmpArray = [item];
        }
    });
    hourlyForecastByDailyDate.push(tmpArray);
    return hourlyForecastByDailyDate;
}

function getDimensions(elementLength, graphHeight=70) {
    return {
        svgWidth: 80 * elementLength,
        svgHeight: 240,
        graphHeight: graphHeight,
        initialYCordOfChart: 60,
    }
}

export default ChartView;
