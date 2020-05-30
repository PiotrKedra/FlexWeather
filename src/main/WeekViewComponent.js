import React from 'react';
import {View, Image} from 'react-native';
import HourlyForecastPanel from "./weather/charts/HourlyForecastPanel";
import DailyForecastPanel from "./weather/charts/daily/DailyForecastPanel";
import CustomText from "./components/CustomText";

class WeekViewComponent extends React.PureComponent{


    render() {
        const today = this.props.todayForecast[0];
        console.log(today);
        return (
            <React.Fragment>
                <View style={{marginHorizontal: '5%', width: '90%', marginTop: 60}}>
                    <CustomText style={{fontSize: 60}}>{today.temperature}°</CustomText>
                    <CustomText style={{fontSize: 20}}>Apparent temperature {today.apparentTemperatureMax}°</CustomText>
                </View>
                <DailyForecastPanel/>
                <HourlyForecastPanel/>
            </React.Fragment>
        )
    }
}

export default WeekViewComponent;
