import React from "react";
import {Svg, G, Rect, Defs, LinearGradient, Stop, Text} from "react-native-svg";
import * as d3 from "d3";
import {getDaysText, getForecastImagesForChart, getFunctionX, getGrid} from "./utility/DailyChartDrawService";
import {getFunctionY} from "../../hourly/svgcharts/utility/ChartDrawService";
import COLORS from "../../utility/ChartColors";
import {connect} from "react-redux";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;
const GRAPH_HEIGHT = 150;
const INIT_Y_CORD = 60;

const DailyRainfallChart = ({forecast, theme}) => {
    const minValue = 0;
    const potentialMax = d3.max(forecast, d => d.rain);
    const maxValue = 15 < potentialMax ? potentialMax : 15;
    const xFunction = getFunctionX(forecast, SVG_WIDTH);
    const yFunction = getFunctionY(minValue, maxValue, GRAPH_HEIGHT, INIT_Y_CORD);

    const mainTextColor = theme.mainText;
    const softTextColor = theme.softText;

    return (
        <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
            <G y={SVG_HEIGHT}>
                {getDefinitions()}
                {getGrid(forecast, xFunction, GRAPH_HEIGHT, INIT_Y_CORD, softTextColor)}
                {getDaysText(forecast, xFunction, mainTextColor)}

                {getGradientForBars(forecast, xFunction, yFunction, INIT_Y_CORD)}
                {getForecastImagesForChart(forecast, xFunction)}

                {getRainfallBars(forecast, xFunction, yFunction)}
                {getRainfallValues(forecast, xFunction, mainTextColor)}
            </G>
        </Svg>
    )
};

function getRainfallValues(forecast, xFunction, color){
    return (forecast.map(item => (
        <Text
            key={item.dt}
            fontSize={18}
            x={xFunction(item.dt)}
            y={-30}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {item.rain ? Math.round(item.rain*10)/10 : 0}
        </Text>
    )))
}

function getDefinitions() {
    return <Defs>
        <LinearGradient id={'dupa'} x1="0" y1="1" x2="0" y2="0">
            <Stop offset="1" stopColor={COLORS.pathBlue} stopOpacity="0.3"/>
            <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
        </LinearGradient>
    </Defs>;
}

function getGradientForBars(data, xFunction, yFunction, initialYCordOfChart){
    return data.map(item => (
        <Rect
            key={item.dt}
            x={xFunction(item.dt)-12.5}
            y={-yFunction(item.rain ? item.rain : 0)}
            rx={1.5}
            width={25}
            height={yFunction(item.rain ? item.rain : 0) - initialYCordOfChart}
            fill={'url(#dupa)'}
        />
    ))
}

function getRainfallBars(data, xFunction, yFunction){
    return data.map(item => {
        if (item.rain === undefined) return null;
        return <Rect
            key={item.dt}
            x={xFunction(item.dt) - 12.5}
            y={yFunction(item.rain) * -1 - 2.5}
            rx={1.5}
            width={25}
            height={5}
            fill={COLORS.pathBlue}
            opacity={0.8}
        />
    })
}

function mapStateToProps(state) {
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(DailyRainfallChart);
