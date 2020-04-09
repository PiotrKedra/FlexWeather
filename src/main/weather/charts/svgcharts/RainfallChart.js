import React from 'react';
import {
    Svg,
    G,
    Text
} from 'react-native-svg';
import * as d3 from 'd3';

import COLORS from "../utility/ChartColors";
import {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateForecastImageForEach,
    generateDateText,
    generateTextForEachItem,
} from "./utility/ChartDrawService";

const RainfallChart = (props) => {

    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = d3.min(data, d => d.precipIntensity);
    const maxValue = d3.max(data, d => d.precipIntensity);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>
                {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data)}

                {/* day date text */}
                {generateDateText(data, svgHeight)}

                {/* forecast images*/}
                {generateForecastImageForEach(data, xFunction, graphHeight, initialYCordOfChart)}

                {/* data values ( text for: hour, temperature, rainfall % ) */}
                {generateDegreeTextForEachItem(data, xFunction, yFunction)}
                {generateTextForEachItem(data, 'precipIntensity', xFunction, 8, -20, 14)}
                {generateTextForEachItem(data, 'time', xFunction, 0, (initialYCordOfChart + graphHeight) * -1 - 70, 20)}
            </G>
        </Svg>
    )
};

function generateDegreeTextForEachItem(data, x, y) {
    return (data.map(item => (
        <Text
            key={'degree' + item.timeObject.timestamp}
            fontSize={16}
            x={x(item.time)}
            y={y(item.precipIntensity) * -1 - 6}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
            {item.precipIntensity + 'ml/h'}
        </Text>
    )))
}

export default RainfallChart;
