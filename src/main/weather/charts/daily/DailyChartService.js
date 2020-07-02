import React from "react";
import {ScrollView} from "react-native";
import DailyGeneralChart from "./svgcharts/DailyGeneralChart";
import DailyRainfallCHart from "./svgcharts/DailyRainfallChart";
import DailyUvIndexChart from "./svgcharts/DailyUvIndexChart";


const DailyChartService = ({currentChart, forecast, theme}) => {

    return (
        <ScrollView horizontal={true}>
            {currentChart==='general' && <DailyGeneralChart forecast={forecast} theme={theme}/>}
            {currentChart==='rainfall' && <DailyRainfallCHart forecast={forecast}/>}
            {currentChart==='uv_index' && <DailyUvIndexChart forecast={forecast}/>}
        </ScrollView>
    )
};

export default DailyChartService
