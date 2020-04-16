import React from "react";
import {
    Circle,
    G, Polygon, Rect,
    Svg
} from "react-native-svg";
import * as d3 from "d3";

import {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateDateText,
    generateTextForEachItem
} from "./utility/ChartDrawService";

const WindChart = (props) => {

    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = 0;//d3.min(data, d => d.windSpeed);
    const maxValue = 15;//d3.max(data, d => d.windSpeed);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>
                {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data)}
                {generateDateText(data, svgHeight)}

                {data.map(item => (
                    getG(item, xFunction)
                ))}

                {generateDataBars(data, xFunction, yFunction, maxValue, initialYCordOfChart)}

                {generateTextForEachItem(data, 'time', xFunction, 0, svgHeight * -1 + 40, 20)}
                {generateTextForEachItem(data, 'windSpeed', xFunction, 0, -30, 16, 'm/s')}
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
            y={y(item.windSpeed)*-1}
            rx={2.5}
            width={5}
            height={y(item.windSpeed) - initialYCordOfChart}
            fill="black"
            opacity={0.8}
        />
    )))
}

const width = 24;
const height = 30;
const r = 5;

function getWindDirectionString(windBearing) {
    if(windBearing < 23)
        return 'N';
    else if (windBearing < 68)
        return 'NE';
    else if (windBearing < 113)
        return 'E';
    else if (windBearing < 158)
        return 'SE';
    else if (windBearing < 203)
        return 'S';
    else if (windBearing < 248)
        return 'SW';
    else if (windBearing < 293)
        return 'W';
    else if (windBearing < 338)
        return 'NW';
    else
        return 'N';
}

function getG(item, xFunction) {
    const x = xFunction(item.time) - width/2;
    const y = 180;
    const points = x + ',' + -y + ' ' +
        (x+width/2) + ',' + -(y-r) + ' ' +
        (x+width) + ',' + -y + ' ' +
        (x+width/2) + ',' + -(y-height);
    return <Polygon points={points}
                    key={item.time}
                    fill="green"
                    transform={{
                        rotation: item.windBearing,
                        originX: x + width/2,
                        originY: -(y - height/3)
                    }}
        />
}

export default WindChart;
