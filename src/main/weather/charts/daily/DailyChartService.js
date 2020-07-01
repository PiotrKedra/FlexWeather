import {G, Line, Text} from "react-native-svg";
import COLORS from "../utility/ChartColors";
import React from "react";
import * as d3 from "d3";


function getDaysText(data, xFunction) {
    return (data.map(item => (
        <Text
            key={item.dt}
            fontSize={20}
            x={xFunction(item.dt)}
            y={-270}
            textAnchor="middle"
            fill={COLORS.mainText}
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

function getHorizontalGridLine(y, shift=0){
    return <Line
        x1={20+shift}
        y1={y}
        x2={580-shift}
        y2={y}
        stroke={COLORS.gridColor}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />
}

function generateVerticalGridLines(data, x, y1, y2) {
    return (data.map(item => (
        <Line
            key={item.dt}
            x1={x(item.dt)}
            y1={y1}
            x2={x(item.dt)}
            y2={y2}
            stroke={COLORS.gridColor}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />
    )))
}

function getGrid(data, xFunction, graphHeight, initialYCordOfChart) {
    return (
        <G>
            {generateVerticalGridLines(data, xFunction, -graphHeight-initialYCordOfChart-10, -initialYCordOfChart+10)}
            {getHorizontalGridLine(-(graphHeight + initialYCordOfChart))}
            {getHorizontalGridLine(-(graphHeight/2 + initialYCordOfChart), 15)}
            {getHorizontalGridLine(-initialYCordOfChart)}
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

export {getDaysText, getGrid, getFunctionX}
