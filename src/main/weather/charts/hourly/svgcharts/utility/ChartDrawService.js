import React from "react";
import * as d3 from "d3";
import {G, Image, Line, Text} from "react-native-svg";

import COLORS from "../../../utility/ChartColors";
import mapDataToIcon, {mapToDayIcon, mapToHourlyIcon} from "../../../utility/ForecastIconMapper";
import {getTempValue} from "../../../../../units/UnitsService";

function getFunctionX(data, svgWidth) {
    const xDomain = data.map(item => item.dt);
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

function getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data, color) {
    return (
        <G>
            {generateVerticalBeginLine(svgHeight, color)}
            {generateFullLengthLine(-initialYCordOfChart - graphHeight, svgWidth, color, 20, )}
            {generateFullLengthLine(-initialYCordOfChart - graphHeight / 2, svgWidth, color, 50)}
            {generateFullLengthLine(-initialYCordOfChart, svgWidth, color, 20)}
            {generateVerticalGridLines(data, xFunction, graphHeight, initialYCordOfChart, color)}
        </G>
    )
}

function generateVerticalBeginLine(svgHeight, color) {
    return <Line
        x1={10}
        y1={-20}
        x2={10}
        y2={-svgHeight}
        stroke={color}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />;
}

function generateFullLengthLine(y, svgWidth, color, xPadding = 0) {
    return <Line
        x1={10 + xPadding}
        y1={y}
        x2={svgWidth - xPadding}
        y2={y}
        stroke={color}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />;
}

function generateVerticalGridLines(data, x, graphHeight, initialYCordOfChart, color) {
    return (data.map(item => (
        <Line
            key={item.dt}
            x1={x(item.dt)}
            y1={-initialYCordOfChart + 10}
            x2={x(item.dt)}
            y2={-initialYCordOfChart - graphHeight - 10}
            stroke={color}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />
    )))
}

function generateForecastImageForEach(data, x, graphHeight, initialYCordOfChart) {
    return (data.map(item => (<Image
            key={item.dt}
            x={x(item.dt) - 17}
            y={(initialYCordOfChart + graphHeight) * -1 - 60}
            width={35}
            height={35}
            preserveAspectRatio="xMidYMid slice"
            opacity="0.8"
            href={mapToHourlyIcon(item.weather[0].icon)}
        />)
    ))
}

function generateDateText(data, svgHeight, color) {
    return <Text
        fontSize="20"
        x={13}
        y={-svgHeight}
        textAnchor="start"
        fill={color}
        fontFamily="Neucha-Regular"
        transform="rotate(90, 3, -230)">
        {parseToDay(data[0].dt)}
    </Text>;
}

function parseToDay(timestamp) {
    let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[new Date(timestamp*1000).getDay()];
}

function getTimeLabels(data, xFunction, y, color){
    return (data.map(item => (
        <Text
            key={item.dt}
            fontSize={20}
            x={xFunction(item.dt)}
            y={y}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {parseTime(item.dt)}
        </Text>
    )))
}

function parseTime(timestamp){
    if(timestamp==='23:59') return timestamp;
    const time = new Date(timestamp*1000);
    return time.getHours() + ':00';
}

function generateTextForEachItem(data, itemKey, xFunction, xShift, y, fontSize, sufix='',color=COLORS.mainText) {
    return (data.map(item => (
        <Text
            key={itemKey + item.dt}
            fontSize={fontSize}
            x={xFunction(item.dt) + xShift}
            y={y}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {item[itemKey] + sufix}
        </Text>
    )))
}

function getDataTextForEachItemAboveBars(data, x, y, key, sufix, color, unit) {
    return (data.map(item => (
        <Text
            key={item.dt}
            fontSize={16}
            x={x(item.dt)}
            y={y(item[key]) * -1 - 6}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {getTempValue(item[key], unit) + sufix}
        </Text>
    )))
}

export {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateForecastImageForEach,
    generateDateText,
    generateTextForEachItem,
    getDataTextForEachItemAboveBars,
    getTimeLabels
}
