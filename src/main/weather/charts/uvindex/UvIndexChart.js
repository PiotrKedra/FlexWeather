import React from 'react';
import {Svg, G, Line, Text, Rect} from 'react-native-svg';
import * as d3 from 'd3';

import COLORS, {UV_COLORS} from "../common/ChartColors";

const UvIndexChart = (props) => {
    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = d3.min(data, d => d.uvIndex);
    const maxValue = d3.max(data, d => d.uvIndex);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>

                {/* grid lines */}
                {generateVerticalBeginLine(svgHeight)}
                {generateFullLengthLine(-initialYCordOfChart - graphHeight, svgWidth)}
                {generateFullLengthLine(-initialYCordOfChart - graphHeight / 2, svgWidth, 50)}
                {generateFullLengthLine(-initialYCordOfChart, svgWidth)}
                {generateVerticalGridLines(data, xFunction, graphHeight, initialYCordOfChart)}

                {/* day date (day name) text */}
                {generateDateText(data, svgHeight)}

                {/* data bars */}
                {generateDataBars(data, xFunction, yFunction, maxValue, initialYCordOfChart)}

                {/* data values ( text for: hour, temperature, rainfall % ) */}
                {generateTextForEachItem(data, 'uvIndex', xFunction, 0, -20, 14)}
                {generateTextForEachItem(data, 'time', xFunction, 0, svgHeight*-1 + 40, 20)}
            </G>
        </Svg>
    )
};

function getFunctionX(data, svgWidth) {
    const xDomain = data.map(item => item.time);
    const xRange = [0, svgWidth];
    return d3
        .scalePoint()
        .domain(xDomain)
        .range(xRange)
        .padding(1);
}

function getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart) {
    const yDomain = [minValue, maxValue];
    const yRange = [initialYCordOfChart, initialYCordOfChart + graphHeight];
    return d3
        .scaleLinear()
        .domain(yDomain)
        .range(yRange);
}

function generateVerticalBeginLine(svgHeight) {
    return <Line
        x1={10}
        y1={-20}
        x2={10}
        y2={-svgHeight}
        stroke={COLORS.gridColor}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />;
}

function generateFullLengthLine(y, svgWidth, xPadding = 0) {
    return <Line
        x1={10 + xPadding}
        y1={y}
        x2={svgWidth - xPadding}
        y2={y}
        stroke={COLORS.gridColor}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />;
}

function generateVerticalGridLines(data, x, graphHeight, initialYCordOfChart) {
    return (data.map(item => (
        <Line
            key={item.timeObject.timestamp}
            x1={x(item.time)}
            y1={-initialYCordOfChart + 10}
            x2={x(item.time)}
            y2={-initialYCordOfChart - graphHeight - 10}
            stroke={COLORS.gridColor}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />
    )))
}

function generateDataBars(data, x, y, maxValue, initialYCordOfChart) {
    if(maxValue===0) return null;
    return (data.map(item => (
        <Rect
            key={'bar' + item.time}
            x={x(item.time) - 2.5}
            y={y(item.uvIndex)*-1}
            rx={2.5}
            width={5}
            height={y(item.uvIndex) - initialYCordOfChart}
            fill={getUVIndexColor(item.uvIndex)}
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

function generateDateText(data, svgHeight) {
    return <Text
        fontSize="20"
        x={13}
        y={-svgHeight}
        textAnchor="start"
        fill={COLORS.gridColor}
        fontFamily="Neucha-Regular"
        transform="rotate(90, 3, -230)">
        {data[0].timeObject.day}
    </Text>;
}

function generateTextForEachItem(data, itemKey, xFunction, xShift, y, fontSize) {
    return (data.map(item => (
        <Text
            key={item.timeObject.timestamp}
            fontSize={fontSize}
            x={xFunction(item.time) + xShift}
            y={y}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {item[itemKey]}
        </Text>
    )))
}

export default UvIndexChart;