import React from 'react';
import {View, Image} from 'react-native';
import HourlyForecastPanel from "./weather/charts/HourlyForecastPanel";
import DailyForecastPanel from "./weather/charts/daily/DailyForecastPanel";
import CustomText from "./components/CustomText";
import TodayDetailPanel from "./weather/detailpanel/TodayDetailPanel";

class WeekViewComponent extends React.PureComponent{


    render() {
        const currentForecast = this.props.currentForecast;
        return (
            <React.Fragment>
                <View style={{marginHorizontal: '5%', width: '90%', marginTop: 60}}>
                    <CustomText style={{fontSize: 60, color: this.props.theme.textColor}}>{Math.round(currentForecast.temp)}°</CustomText>
                    <CustomText style={{fontSize: 20, color: this.props.theme.textColor}}>{this.props.theme.summary}</CustomText>
                </View>
                <DailyForecastPanel currentForecast={currentForecast} forecast={this.props.todayForecast}/>
                <HourlyForecastPanel/>
                <TodayDetailPanel forecast={currentForecast}/>
            </React.Fragment>
        )
    }
}

export default WeekViewComponent;
