import React from 'react';
import {Svg, G, Text, Rect} from "react-native-svg";
import COLORS, {UV_COLORS} from "../../utility/ChartColors";
import {
    getFunctionY,
} from "../../svgcharts/utility/ChartDrawService";
import * as d3 from "d3";
import {getDaysText, getForecastImagesForChart, getFunctionX, getGrid} from "../DailyChartService";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

const DailyUvIndexChart = ({forecast}) => {

    const minValue = 0;
    const potentialMax = d3.max(forecast, d => d.uvi);
    const maxValue = 13 > potentialMax ? 13 : potentialMax;
    const xFunction = getFunctionX(forecast, SVG_WIDTH);
    const yFunction = getFunctionY(minValue, maxValue, 150, 60);

    return (
        <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
            <G y={SVG_HEIGHT}>
                {getGrid(forecast, xFunction, 150, 60)}

                {getForecastImagesForChart(forecast, xFunction)}
                {getDaysText(forecast, xFunction)}

                {/* data bars */}
                {generateDataBars(forecast, xFunction, yFunction, 60)}

                {drawUvIndexValues(forecast, xFunction)}
            </G>
        </Svg>
    )
};

function drawUvIndexValues(forecast, xFunction){
    return (forecast.map(item => (
        <Text
            key={item.dt}
            fontSize={18}
            x={xFunction(item.dt)}
            y={-30}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {Math.round(item.uvi*10)/10}
        </Text>
    )))
}



function generateDataBars(data, x, y, initialYCordOfChart) {
    return (data.map(item => (
        <Rect
            key={item.dt}
            x={x(item.dt) - 2.5}
            y={-y(item.uvi)}
            rx={2.5}
            width={5}
            height={y(item.uvi)-initialYCordOfChart}
            fill={getUVIndexColor(item.uvi)}
            opacity={0.8}
        />
    )))
}

function getUVIndexColor(uvIndex) {
    if(uvIndex <= 2)
        return UV_COLORS.uvLow;
    else if(uvIndex <= 5)
        return UV_COLORS.uvModerate;
    else if(uvIndex <= 7)
        return UV_COLORS.uvHigh;
    else if(uvIndex <= 10)
        return UV_COLORS.uvVeryHigh;
    else
        return UV_COLORS.uvExtreme;
}

export default DailyUvIndexChart;
