import React from 'react';
import {
    Svg,
    G,
    Text, Rect, Defs, LinearGradient, Stop, Polygon, Line
} from 'react-native-svg';
import * as d3 from 'd3';
import {connect} from 'react-redux';

import COLORS from "../../utility/ChartColors";
import {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateForecastImageForEach,
    generateDateText,
    getTimeLabels,
} from "./utility/ChartDrawService";

const RainfallChart = (props) => {

    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = d3.min(data, d => d.rain ? d.rain['1h'] : 0);
    const maxValue = getMaxValue(data);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    const mainTextColor = props.theme.mainText;
    const softTextColor = props.theme.softText;

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>
                {getDefinitions()}
                {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data, softTextColor)}

                {/*/!* day date text *!/*/}
                {generateDateText(data, svgHeight, softTextColor)}

                {/*/!* forecast images*!/*/}
                {generateForecastImageForEach(data, xFunction, graphHeight, initialYCordOfChart)}

                {getGradientForBars(data, xFunction, yFunction, initialYCordOfChart)}
                {getRainfallBars(data, xFunction, yFunction)}

                {/*/!* data values ( text for: hour, temperature, rainfall % ) *!/*/}
                {generateDegreeTextForEachItem(data, xFunction, yFunction, mainTextColor)}
                {getTimeLabels(data,  xFunction, (initialYCordOfChart + graphHeight) * -1 - 70, mainTextColor)}
            </G>
        </Svg>
    )
};

function getMaxValue(data) {
    const defaultMaxValue = 1;
    const maxValue = d3.max(data, d => d.rain ? d.rain['1h'] : 0);
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

function getGradientForBars(data, xFunction, yFunction, initialYCordOfChart){
    return data.map(item => (
        <Rect
            key={item.dt}
            x={xFunction(item.dt)-12.5}
            y={-yFunction(item.rain ? item.rain['1h'] : 0)}
            rx={1.5}
            width={25}
            height={yFunction(item.rain ? item.rain['1h'] : 0) - initialYCordOfChart}
            fill={'url(#dupa)'}
        />
    ))
}

function getRainfallBars(data, xFunction, yFunction){
    return data.map(item => {
        if (item.rain === undefined) return null;
        return <Rect
            key={item.dt}
            x={xFunction(item.dt) - 12.5}
            y={yFunction(item.rain['1h']) * -1 - 2.5}
            rx={1.5}
            width={25}
            height={5}
            fill={COLORS.pathBlue}
            opacity={0.8}
        />
    })
}

function generateDegreeTextForEachItem(data, x, y, color) {
    return (data.map(item => (
        <Text
            key={item.dt}
            fontSize={16}
            x={x(item.dt)}
            y={y(item.rain ? item.rain['1h'] : 0) * -1 - 6}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {Math.round((item.rain ? item.rain['1h'] : 0)*100)/100 + 'mm'}
        </Text>
    )))
}

function mapStateToProps(state){
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(RainfallChart);
