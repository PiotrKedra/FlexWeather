import {G, Image, Line, Text} from "react-native-svg";
import React from "react";
import * as d3 from "d3";
import {mapToDayIcon} from "../../../utility/ForecastIconMapper";


function getDaysText(data, xFunction, color) {
    return (data.map(item => (
        <Text
            key={item.dt}
            fontSize={20}
            x={xFunction(item.dt)}
            y={-270}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {getDay(item.dt)}
        </Text>
    )))
}

function getDay(timestamp){
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[date.getDay()];
}

function getHorizontalGridLine(y, color, shift=0){
    return <Line
        x1={20+shift}
        y1={y}
        x2={580-shift}
        y2={y}
        stroke={color}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />
}

function generateVerticalGridLines(data, x, y1, y2, color) {
    return (data.map(item => (
        <Line
            key={item.dt}
            x1={x(item.dt)}
            y1={y1}
            x2={x(item.dt)}
            y2={y2}
            stroke={color}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />
    )))
}

function getGrid(data, xFunction, graphHeight, initialYCordOfChart, color) {
    return (
        <G>
            {generateVerticalGridLines(data, xFunction, -graphHeight-initialYCordOfChart-10, -initialYCordOfChart+10, color)}
            {getHorizontalGridLine(-(graphHeight + initialYCordOfChart), color)}
            {getHorizontalGridLine(-(graphHeight/2 + initialYCordOfChart), color, 15)}
            {getHorizontalGridLine(-initialYCordOfChart, color)}
        </G>
    )
}

function getFunctionX(data, svgWidth) {
    const xDomain = data.map(item => item.dt);
    const xRange = [-20, svgWidth+20];
    return d3
        .scalePoint()
        .domain(xDomain)
        .range(xRange)
        .padding(1);
}

function getForecastImagesForChart(data, x) {
    return (data.map(item => (<Image
            key={item.dt}
            x={x(item.dt) - 17}
            y={-260}
            width={35}
            height={35}
            preserveAspectRatio="xMidYMid slice"
            opacity="0.8"
            href={mapToDayIcon(item.weather[0].icon, item.rain)}
        />)
    ))
}

export {getDaysText, getGrid, getFunctionX, getForecastImagesForChart}
