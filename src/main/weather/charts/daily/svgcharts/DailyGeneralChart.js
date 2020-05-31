import React from 'react';
import {Svg, G, Line, Circle, Image, Text} from "react-native-svg";
import * as d3 from "d3";
import COLORS from "../../utility/ChartColors";
import mapDataToIcon from "../../utility/ForecastIconMapper";

const DailyGeneralChart = ({forecast}) => {

    const minValue = d3.min(forecast, i => parseInt(i.temperatureMax));
    const maxValue = d3.max(forecast, i => parseInt(i.temperatureMax));
    const functionX = getFunctionX(forecast, 500);
    const functionY = getFunctionY(minValue, maxValue, 40, 160);

    const minValueMin = d3.min(forecast, i => parseInt(i.temperatureMin));
    const maxValueMin = d3.max(forecast, i => parseInt(i.temperatureMin));
    const functionMinY = getFunctionY(minValueMin, maxValueMin, 40, 100);

    return (
        <Svg width={500} height={340}>
            <G y={340}>
                {generateLineComponents(forecast, functionX, functionY)}
                {generateDotForEach(forecast, functionX, functionY)}

                {generateVerticalGridLines(forecast, functionX)}

                {generateTextForEachItem(forecast, functionX)}

                {generateForecastImageForEach(forecast, functionX, -280)}
                {generateForecastImageForEach(forecast, functionX, -60)}

                {generateLineComponentsMin(forecast, functionX, functionMinY)}

                {getDataTextForEachItemAboveBars(forecast, functionX, functionY, 'temperatureMax', '°')}
                {getDataTextForEachItemAboveBars(forecast, functionX, functionMinY, 'temperatureMin', '°')}
                {generateDotForEachMin(forecast, functionX, functionMinY)}
                <Line
                    x1={10}
                    y1={-150}
                    x2={490}
                    y2={-150}
                    stroke={COLORS.gridColor}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />
            </G>
        </Svg>
    )

};

function getDate(timestamp){
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    return date.getDate() + '.' + (date.getMonth()+1);
}

function getDay(timestamp){
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[date.getDay()];
}


function generateTextForEachItem(data, xFunction) {
    return (data.map(item => (
        <Text
            key={item.timestamp}
            fontSize={20}
            x={xFunction(item.timestamp)}
            y={-290}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {getDay(item.timestamp)}
        </Text>
    )))
}

function generateVerticalGridLines(data, x) {
    return (data.map(item => (
        <Line
            key={item.timestamp}
            x1={x(item.timestamp)}
            y1={-220}
            x2={x(item.timestamp)}
            y2={-80}
            stroke={COLORS.gridColor}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />
    )))
}

function getDataTextForEachItemAboveBars(data, x, y, key, sufix) {
    return (data.map(item => (
        <Text
            key={item.timestamp}
            fontSize={16}
            x={x(item.timestamp)}
            y={y(item[key]) * -1 - 6}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {item[key] + sufix}
        </Text>
    )))
}

function generateForecastImageForEach(data, x, position) {
    return (data.map(item => (<Image
            key={item.timestamp}
            x={x(item.timestamp) - 17}
            y={position}
            width={35}
            height={35}
            preserveAspectRatio="xMidYMid slice"
            opacity="0.8"
            href={mapDataToIcon(item.icon)}
        />)
    ))
}
function generateDotForEachMin(data, x, y) {
    return (data.map(item => (
        <Circle
            key={item.timestamp}
            cx={x(item.timestamp)}
            cy={y(item.temperatureMin) * -1}
            r="2"
            fill={COLORS.pathDarkBlue}
        />
    )))
}

function generateLineComponentsMin(data, x, y) {
    let lineArray = [];
    for (let i = 0; i < data.length - 1; i++) {
        const x1 = x(data[i].timestamp);
        const y1 = y(data[i].temperatureMin);
        const x2 = x(data[i + 1].timestamp);
        const y2 = y(data[i + 1].temperatureMin);
        const lineComponent = (
            <Line
                key={data[i].timestamp}
                x1={x1}
                y1={y1 * -1}
                x2={x2}
                y2={y2 * -1}
                stroke={COLORS.pathDarkBlue}
                strokeWidth="4"
            />
        );
        lineArray.push(lineComponent);
    }
    return lineArray;
}
function generateDotForEach(data, x, y) {
    return (data.map(item => (
        <Circle
            key={item.timestamp}
            cx={x(item.timestamp)}
            cy={y(item.temperatureMax) * -1}
            r="2"
            fill={COLORS.pathBlue}
        />
    )))
}

function generateLineComponents(data, x, y) {
    let lineArray = [];
    for (let i = 0; i < data.length - 1; i++) {
        const x1 = x(data[i].timestamp);
        const y1 = y(data[i].temperatureMax);
        const x2 = x(data[i + 1].timestamp);
        const y2 = y(data[i + 1].temperatureMax);
        const lineComponent = (
            <Line
                key={data[i].timestamp}
                x1={x1}
                y1={y1 * -1}
                x2={x2}
                y2={y2 * -1}
                stroke={COLORS.pathBlue}
                strokeWidth="4"
            />
        );
        lineArray.push(lineComponent);
    }
    return lineArray;
}

function getFunctionX(data, svgWidth) {
    const xDomain = data.map(item => item.timestamp);
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

export default DailyGeneralChart;
