import React from 'react';
import {Svg, G, Line, Circle, Image, Text, Polygon, Defs, LinearGradient, Stop, Rect} from "react-native-svg";
import * as d3 from "d3";
import COLORS from "../../utility/ChartColors";
import {mapToDayIcon, mapToNightIcon} from "../../utility/ForecastIconMapper";

const DailyGeneralChart = ({forecast}) => {

    console.log(forecast);

    const minValue = d3.min(forecast, i => parseInt(i.temp.max));
    const maxValue = d3.max(forecast, i => parseInt(i.temp.max));
    const functionX = getFunctionX(forecast, 600);
    const functionY = getFunctionY(minValue, maxValue, 35, 160);

    const minValueMin = d3.min(forecast, i => parseInt(i.temp.min));
    const maxValueMin = d3.max(forecast, i => parseInt(i.temp.max));
    const functionMinY = getFunctionY(minValueMin, maxValueMin, 35, 100);

    forecast.forEach(i => console.log(i.rain));
    const minValueRain = d3.min(forecast, i => parseFloat(i.rain));
    let maxValueRain = d3.max(forecast, i => parseFloat(i.rain));
    maxValueRain = maxValueRain < 20 ? 20 : maxValueRain;
    const yRainFunction = getFunctionY(minValueRain, maxValueRain, 100, 0);

    console.log('min: ' + minValueRain + ', max: ' + maxValueRain);

    return (
        <Svg width={600} height={300}>
            <G y={300}>
                {getDefinitions()}
                {generateGradientComponent(forecast, functionX, functionY)}
                {generateLineComponents(forecast, functionX, functionY)}
                {generateDotForEach(forecast, functionX, functionY)}

                {generateVerticalGridLines(forecast, functionX)}

                {getRainBars(forecast, functionX, yRainFunction, minValueRain, 100)}
                {generateTextForEachItem(forecast, functionX)}

                {generateForecastImageForEach(forecast, functionX, -260, mapToDayIcon)}
                {generateForecastImageForEach(forecast, functionX, -75, mapToNightIcon)}

                {generateLineComponentsMin(forecast, functionX, functionMinY)}


                {getDataTextForEachItemAboveBars(forecast, functionX, functionY, 'max', '°')}
                {getDataTextForEachItemAboveBars(forecast, functionX, functionMinY, 'min', '°')}
                {generateDotForEachMin(forecast, functionX, functionMinY)}
                <Line
                    x1={10}
                    y1={-150}
                    x2={590}
                    y2={-150}
                    stroke={COLORS.gridColor}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />
            </G>
        </Svg>
    )

};

function getRainBars(data, x, y, minValue, initialYCordOfChart) {
    if(minValue===0) return null;
    return (data.map(item => (
        <Rect
            key={item.dt}
            x={x(item.dt)-3}
            y={-(150+y(item.rain)/2)}
            rx={3}
            width={6}
            height={y(item.rain)}
            fill="#2a4de2"
            opacity={0.5}
        />
    )))
}

function getDefinitions() {
    return <Defs>
        <LinearGradient id={'GRADIENT_ID'} x1="0" y1="1" x2="0" y2="0">
            <Stop offset="1" stopColor={COLORS.pathBlue} stopOpacity="0.3"/>
            <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
        </LinearGradient>
    </Defs>;
}

function generateGradientComponent(data, x, y){
    let polygonPoints = "";
    for (let item of data) {
        polygonPoints += Math.ceil(x(item.dt)) + ',' + -Math.ceil(y(item.temp.max)) + ' ';
    }
    polygonPoints +=  Math.ceil(x(data[data.length - 1].dt)) + ',' + -100 +  ' '
        + Math.ceil(x(data[0].dt)) + ',' + -100;

    console.log(polygonPoints);
    return (
        <Polygon
            points={polygonPoints}
            fill={'url(#' + 'GRADIENT_ID' + ')'}
        />
    )
}

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
            href={fun(item.weather[0].icon)}
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
function generateDotForEach(data, x, y) {
    return (data.map(item => (
        <Circle
            key={item.dt}
            cx={x(item.dt)}
            cy={y(item.temp.max) * -1}
            r="2"
            fill={COLORS.pathBlue}
        />
    )))
}

function generateLineComponents(data, x, y) {
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
                stroke={COLORS.pathBlue}
                strokeWidth="4"
            />
        );
        lineArray.push(lineComponent);
    }
    return lineArray;
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

function getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart) {
    const yDomain = [minValue, maxValue];
    const yRange = [initialYCordOfChart, initialYCordOfChart + graphHeight];
    return d3
        .scaleLinear()
        .domain(yDomain)
        .range(yRange);
}

export default DailyGeneralChart;
