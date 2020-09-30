import React, {useState, useEffect, Fragment} from 'react';
import {View} from 'react-native';
import HourlyForecastPanel from "./charts/hourly/HourlyForecastPanel";
import DailyForecastPanel from "./mainpanel/DailyForecastPanel";
import CustomText from "../components/CustomText";
import TodayDetailPanel from "./detailpanel/TodayDetailPanel";
import {connect} from "react-redux";
import {getTempValue} from "../units/UnitsService";

const WeatherPanels = ({currentForecast, weatherTheme, weatherUnits}) => {

    return (
        <React.Fragment>
            <View style={{marginHorizontal: '5%', width: '90%', marginTop: 60}}>
                {
                    currentForecast===undefined || weatherUnits===undefined ?
                        <Fragment>
                            <View style={{width: 70, height: 70, backgroundColor: 'rgba(1,1,1,0.1)', borderRadius: 5}}/>
                            <View style={{width: 150, height: 25, backgroundColor: 'rgba(1,1,1,0.1)', borderRadius: 5}}/>
                        </Fragment>
                        :
                        <Fragment>
                            <CustomText style={{fontSize: 60, color: weatherTheme.textColor}}>
                                {getTempValue(currentForecast.temp, weatherUnits.temp)}°
                            </CustomText>
                            <CustomText style={{fontSize: 20, color: weatherTheme.textColor}}>{weatherTheme.summary}</CustomText>
                        </Fragment>
                }
            </View>
            <DailyForecastPanel/>
            <HourlyForecastPanel/>
            <TodayDetailPanel/>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        currentForecast: state.currentForecast,
        weatherTheme: state.weatherTheme,
        weatherUnits: state.weatherUnits
    };
}

export default connect(mapStateToProps)(WeatherPanels);
