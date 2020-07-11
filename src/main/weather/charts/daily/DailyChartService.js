import React from "react";
import {ScrollView} from "react-native";
import DailyGeneralChart from "./svgcharts/DailyGeneralChart";
import DailyRainfallCHart from "./svgcharts/DailyRainfallChart";
import DailyUvIndexChart from "./svgcharts/DailyUvIndexChart";
import DailyWindChart from "./svgcharts/DailyWindChart";


const DailyChartService = ({currentChart, forecast, weatherTheme}) => {

    return (
        <ScrollView horizontal={true}>
            {currentChart==='general' && <DailyGeneralChart forecast={forecast} weatherTheme={weatherTheme}/>}
            {currentChart==='wind' && <DailyWindChart forecast={forecast}/>}
            {currentChart==='rainfall' && <DailyRainfallCHart forecast={forecast}/>}
            {currentChart==='uv_index' && <DailyUvIndexChart forecast={forecast}/>}
        </ScrollView>
    )
};

export default DailyChartService
