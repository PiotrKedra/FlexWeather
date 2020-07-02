import React from 'react';
import {Svg, G, Line, Circle, Image, Text, Polygon, Defs, LinearGradient, Stop, Rect} from "react-native-svg";
import * as d3 from "d3";
import COLORS from "../../utility/ChartColors";
import {mapToDayIcon, mapToNightIcon} from "../../utility/ForecastIconMapper";
import {getDaysText, getFunctionX, getGrid} from "../DailyChartDrawService";

const DailyGeneralChart = ({forecast, theme}) => {

    const minValue = d3.min(forecast, i => parseInt(i.temp.max));
    const maxValue = d3.max(forecast, i => parseInt(i.temp.max));
    const functionX = getFunctionX(forecast, 600);
    const functionY = getFunctionY(minValue, maxValue, 35, 160);

    const minValueMin = d3.min(forecast, i => parseInt(i.temp.min));
    const maxValueMin = d3.max(forecast, i => parseInt(i.temp.max));
    const functionMinY = getFunctionY(minValueMin, maxValueMin, 35, 100);

    let minValueRain = d3.min(forecast, i => parseFloat(i.rain));
    minValueRain = minValueRain ? minValueRain : 0;
    let maxValueRain = d3.max(forecast, i => parseFloat(i.rain));
    maxValueRain = maxValueRain < 20 || maxValueRain === undefined ? 20 : maxValueRain;
    const yRainFunction = getFunctionY(minValueRain, maxValueRain, 100, 0);

    return (
        <Svg width={600} height={300}>
            <G y={300}>
                {getDefinitions(theme.mainColor)}
                {getRainBars(forecast, functionX, yRainFunction, minValueRain, 100)}
                {generateGradientComponent(forecast, functionX, functionY)}
                {generateLineComponents(forecast, functionX, functionY, theme.mainColor)}
                {generateDotForEach(forecast, functionX, functionY, theme.mainColor)}

                {generateVerticalGridLines(forecast, functionX)}
                {getGrid(forecast, functionX, 125, 90)}

                {getDaysText(forecast, functionX)}

                {generateForecastImageForEach(forecast, functionX, -260, mapToDayIcon)}
                {generateForecastImageForEach(forecast, functionX, -75, mapToNightIcon)}

                {generateLineComponentsMin(forecast, functionX, functionMinY)}


                {getDataTextForEachItemAboveBars(forecast, functionX, functionY, 'max', '°')}
                {getDataTextForEachItemAboveBars(forecast, functionX, functionMinY, 'min', '°')}
                {generateDotForEachMin(forecast, functionX, functionMinY)}
            </G>
        </Svg>
    )

};

function getRainBars(data, x, y, minValue) {
    if(minValue===0) return null;
    return (data.map(item => (
        <Rect
            key={item.dt}
            x={x(item.dt)-3}
            y={-(150+y(item.rain ? item.rain : 0)/2)}
            rx={3}
            width={6}
            height={y(item.rain)}
            fill={COLORS.pathBlue}
            opacity={0.6}
        />
    )))
}

function getDefinitions(color=COLORS.pathBlue) {
    return <Defs>
        <LinearGradient id={'GRADIENT_ID'} x1="0" y1="1" x2="0" y2="0">
            <Stop offset="1" stopColor={color} stopOpacity="0.3"/>
            <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
        </LinearGradient>
    </Defs>;
}

function generateGradientComponent(data, x, y){
    let polygonPoints = "";
    for (let item of data) {
        polygonPoints += Math.ceil(x(item.dt)-1) + ',' + -Math.ceil(y(item.temp.max)) + ' ';
    }
    polygonPoints +=  Math.ceil(x(data[data.length - 1].dt)-1) + ',' + -100 +  ' '
        + Math.ceil(x(data[0].dt)) + ',' + -100;
    return (
        <Polygon
            points={polygonPoints}
            fill={'url(#' + 'GRADIENT_ID' + ')'}
        />
    )
}

function generateVerticalGridLines(data, x) {
    return (data.map(item => (
        <Line
            key={item.dt}
            x1={x(item.dt)}
            y1={-220}
            x2={x(item.dt)}
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
            key={item.dt}
            fontSize={16}
            x={x(item.dt)}
            y={y(item.temp[key]) * -1 - 6}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {Math.round(item.temp[key]) + sufix}
        </Text>
    )))
}

function generateForecastImageForEach(data, x, position, fun) {
    return (data.map(item => (<Image
            key={item.dt}
            x={x(item.dt) - 17}
            y={position}
            width={35}
            height={35}
            preserveAspectRatio="xMidYMid slice"
            opacity="0.8"
            href={fun(item.weather[0].icon, item.rain)}
        />)
    ))
}

function generateDotForEachMin(data, x, y) {
    return (data.map(item => (
        <Circle
            key={item.dt}
            cx={x(item.dt)}
            cy={y(item.temp.min) * -1}
            r="2"
            fill={COLORS.pathDarkBlue}
        />
    )))
}

function generateLineComponentsMin(data, x, y) {
    let lineArray = [];
    for (let i = 0; i < data.length - 1; i++) {
        const x1 = x(data[i].dt);
        const y1 = y(data[i].temp.min);
        const x2 = x(data[i + 1].dt);
        const y2 = y(data[i + 1].temp.min);
        const lineComponent = (
            <Line
                key={data[i].dt}
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
function generateDotForEach(data, x, y, color=COLORS.pathBlue) {
    return (data.map(item => (
        <Circle
            key={item.dt}
            cx={x(item.dt)}
            cy={y(item.temp.max) * -1}
            r="2"
            fill={color}
        />
    )))
}

function generateLineComponents(data, x, y, color=COLORS.pathBlue) {
    let lineArray = [];
    for (let i = 0; i < data.length - 1; i++) {
        const x1 = x(data[i].dt);
        const y1 = y(data[i].temp.max);
        const x2 = x(data[i + 1].dt);
        const y2 = y(data[i + 1].temp.max);
        const lineComponent = (
            <Line
                key={data[i].dt}
                x1={x1}
                y1={y1 * -1}
                x2={x2}
                y2={y2 * -1}
                stroke={color}
                strokeWidth="4"
            />
        );
        lineArray.push(lineComponent);
    }
    return lineArray;
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
