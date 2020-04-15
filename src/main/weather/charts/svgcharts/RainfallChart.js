import React from 'react';
import {
    Svg,
    G,
    Text, Rect, Defs, LinearGradient, Stop, Polygon, Line
} from 'react-native-svg';
import * as d3 from 'd3';

import COLORS from "../utility/ChartColors";
import {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateForecastImageForEach,
    generateDateText,
    generateTextForEachItem,
} from "./utility/ChartDrawService";

const RainfallChart = (props) => {

    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = d3.min(data, d => d.precipIntensity);
    const maxValue = getMaxValue(data);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>
                {getDefinitions()}
                {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data)}

                {generateFullLengthLine(svgWidth)}
                {getHumidityText()}

                {/* day date text */}
                {generateDateText(data, svgHeight)}

                {/* forecast images*/}
                {generateForecastImageForEach(data, xFunction, graphHeight, initialYCordOfChart)}

                {getGradientForBars(data, xFunction, yFunction, initialYCordOfChart)}
                {getRainfallBars(data, xFunction, yFunction)}

                {/* data values ( text for: hour, temperature, rainfall % ) */}
                {generateDegreeTextForEachItem(data, xFunction, yFunction)}
                {generateTextForEachItem(data, 'humidity', xFunction, 0, -20, 14, COLORS.gray)}
                {generateTextForEachItem(data, 'time', xFunction, 0, (initialYCordOfChart + graphHeight) * -1 - 70, 20)}
            </G>
        </Svg>
    )
};

function getMaxValue(data) {
    const defaultMaxValue = 10;
    const maxValue = d3.max(data, d => d.precipIntensity);
    return (defaultMaxValue > maxValue) ? defaultMaxValue : maxValue;
}

function getDefinitions() {
    return <Defs>
        <LinearGradient id={'dupa'} x1="0" y1="1" x2="0" y2="0">
            <Stop offset="1" stopColor={COLORS.pathBlue} stopOpacity="0.3"/>
            <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
        </LinearGradient>
    </Defs>;
}

function getHumidityText() {
    return <Text fontSize={14}
                 x={11}
                 y={-37}
                 textAnchor="start"
                 fill={COLORS.gray}
                 fontFamily="Neucha-Regular">
                humidity:
            </Text>;
}

function getGradientForBars(data, xFunction, yFunction, initialYCordOfChart){
    return data.map(item => (
        <Rect
            key={item.time}
            x={xFunction(item.time)-12.5}
            y={-yFunction(item.precipIntensity)}
            rx={1.5}
            width={25}
            height={yFunction(item.precipIntensity) - initialYCordOfChart}
            fill={'url(#dupa)'}
        />
    ))
}

function generateFullLengthLine(svgWidth) {
    return <Line
        x1={11}
        y1={-50}
        x2={60}
        y2={-50}
        stroke={COLORS.gray}
    />;
}

function getRainfallBars(data, xFunction, yFunction){
    return data.map(item => {
        if (item.precipIntensity <= 0) return null;
        return <Rect
            key={item.time}
            x={xFunction(item.time) - 12.5}
            y={yFunction(item.precipIntensity) * -1 - 2.5}
            rx={1.5}
            width={25}
            height={5}
            fill={COLORS.pathBlue}
            opacity={0.8}
        />
    })
}

function generateDegreeTextForEachItem(data, x, y) {
    return (data.map(item => (
        <Text
            key={'degree' + item.timeObject.timestamp}
            fontSize={16}
            x={x(item.time)}
            y={y(item.precipIntensity) * -1 - 6}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {item.precipIntensity + 'mm'}
        </Text>
    )))
}

export default RainfallChart;
