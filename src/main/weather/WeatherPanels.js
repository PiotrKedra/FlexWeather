import React, {Fragment} from 'react';
import {View} from 'react-native';
import HourlyForecastPanel from "./charts/hourly/HourlyForecastPanel";
import DailyForecastPanel from "./charts/daily/DailyForecastPanel";
import CustomText from "../components/CustomText";
import TodayDetailPanel from "./detailpanel/TodayDetailPanel";
import {connect} from "react-redux";

const WeatherPanels = ({currentForecast, weatherTheme}) => {

    return (
        <React.Fragment>
            <View style={{marginHorizontal: '5%', width: '90%', marginTop: 60}}>
                {
                    currentForecast===undefined ?
                        <Fragment>
                            <View style={{width: 70, height: 70, backgroundColor: 'rgba(1,1,1,0.1)', borderRadius: 5}}/>
                            <View style={{width: 150, height: 25, backgroundColor: 'rgba(1,1,1,0.1)', borderRadius: 5}}/>
                        </Fragment>
                        :
                        <Fragment>
                            <CustomText style={{fontSize: 60, color: weatherTheme.textColor}}>{Math.round(currentForecast.temp)}°</CustomText>
                            <CustomText style={{fontSize: 20, color: weatherTheme.textColor}}>{weatherTheme.summary}</CustomText>
                        </Fragment>
                }
            </View>
            {/*<DailyForecastPanel currentForecast={currentForecast} forecast={this.props.dailyForecast}/>*/}
            <HourlyForecastPanel/>
            <TodayDetailPanel/>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        currentForecast: state.currentForecast,
        weatherTheme: state.weatherTheme,
    };
}

export default connect(mapStateToProps)(WeatherPanels);
