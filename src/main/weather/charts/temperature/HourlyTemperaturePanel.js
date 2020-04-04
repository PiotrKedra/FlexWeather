import React from 'react';
import TemperatureChart from "./TemperatureChart";

class HourlyTemperaturePanel extends React.Component {

    render() {
        return this.generateChartComponentsForNext48H(this.props.hourlyForecast);
    }

    generateChartComponentsForNext48H(hourlyForecast) {
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
            return (<TemperatureChart key={key} data={hourlyForecastPerDay}/>)
        })
    }
}

export default HourlyTemperaturePanel;
