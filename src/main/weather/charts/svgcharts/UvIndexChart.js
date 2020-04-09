import React from 'react';
import {Svg, G, Line, Text, Rect} from 'react-native-svg';
import * as d3 from 'd3';

import {UV_COLORS} from "../utility/ChartColors";
import {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateDateText,
    generateTextForEachItem,
} from "./utility/ChartDrawService";

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
                {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data)}

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

export default UvIndexChart;
