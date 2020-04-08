import React from "react";

import TemperatureChart from "./temperature/TemperatureChart";
import RainfallChart from "./rainfall/RainfallChart";
import UvIndexChart from "./uvindex/UvIndexChart";

function HourlyTemperatureChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <TemperatureChart key={i++} data={hourlyForecastPerDay}/>)
}

function HourlyRainfallChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <RainfallChart key={i++} data={hourlyForecastPerDay}/>)
}

function HourlyUvIndexChart(props){
    let i = 0;
    return parseHourlyForecast(props.hourlyForecast).map(hourlyForecastPerDay =>
        <UvIndexChart key={i++} data={hourlyForecastPerDay}/>)
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

export {
    HourlyTemperatureChart,
    HourlyRainfallChart,
    HourlyUvIndexChart,
};
