import React from 'react';
import UvIndexChart from "./UvIndexChart";

function HourlyUvIndexPanel(props) {
    return generateChartComponentsForNext48H(props.hourlyForecast);
}

function generateChartComponentsForNext48H(hourlyForecast) {
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
    let index=0;
    return hourlyForecastByDailyDate.map(hourlyForecastPerDay => {
        let key = 'k' + index;
        index = index + 1;
        return (<UvIndexChart key={key} data={hourlyForecastPerDay}/>)
    })
}

export default HourlyUvIndexPanel;
