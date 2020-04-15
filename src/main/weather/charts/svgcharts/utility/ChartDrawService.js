import React from "react";
import * as d3 from "d3";
import {G, Image, Line, Text} from "react-native-svg";

import COLORS from "../../utility/ChartColors";
import mapDataToIcon from "../../utility/ForecastIconMapper";

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

function getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data) {
    return (
        <G>
            {generateVerticalBeginLine(svgHeight)}
            {generateFullLengthLine(-initialYCordOfChart - graphHeight, svgWidth)}
            {generateFullLengthLine(-initialYCordOfChart - graphHeight / 2, svgWidth,50)}
            {generateFullLengthLine(-initialYCordOfChart, svgWidth)}
            {generateVerticalGridLines(data, xFunction, graphHeight, initialYCordOfChart)}
        </G>
    )
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

function generateForecastImageForEach(data, x, graphHeight, initialYCordOfChart) {
    return (data.map(item => (<Image
            key={item.timeObject.timestamp}
            x={x(item.time) - 17}
            y={(initialYCordOfChart + graphHeight) * -1 - 60}
            width={35}
            height={35}
            preserveAspectRatio="xMidYMid slice"
            opacity="0.8"
            href={mapDataToIcon(item.icon)}
        />)
    ))
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

function generateTextForEachItem(data, itemKey, xFunction, xShift, y, fontSize, sufix='',color=COLORS.mainText) {
    return (data.map(item => (
        <Text
            key={itemKey + item.timeObject.timestamp}
            fontSize={fontSize}
            x={xFunction(item.time) + xShift}
            y={y}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {item[itemKey] + sufix}
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
}
