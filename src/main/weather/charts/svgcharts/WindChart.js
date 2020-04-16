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
    generateTextForEachItem,
    generateDegreeTextForEachItem,
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

                {getWindDirectionArrowsForEach(data, xFunction)}
                {generateDataBars(data, xFunction, yFunction, maxValue, initialYCordOfChart)}

                {generateDegreeTextForEachItem(data, xFunction, yFunction, 'windSpeed', 'm/s')}
                {generateTextForEachItem(data, 'time', xFunction, 0, svgHeight * -1 + 40, 20)}
            </G>
        </Svg>
    )
};

function generateDataBars(data, x, y, maxValue, initialYCordOfChart) {
    if(maxValue===0) return null;
    return (data.map(item => (
        <Rect
            key={item.time}
            x={x(item.time) - 3}
            y={y(item.windSpeed)*-1}
            rx={3}
            width={6}
            height={y(item.windSpeed) - initialYCordOfChart}
            fill="#3EA435"
            opacity={0.8}
        />
    )))
}

function getWindDirectionArrowsForEach(data, xFunction) {
    return data.map(item => (
            getWindArrow(item, xFunction)
        ));
}

const WIND_ARROW_WIDTH = 24;
const WIND_ARROW_HEIGHT = 30;
const WIND_ARROW_R = 5;

function getWindArrow(item, xFunction) {
    const x = xFunction(item.time) - WIND_ARROW_WIDTH/2;
    const y = 180;
    const points = x + ',' + -y + ' ' +
        (x+WIND_ARROW_WIDTH/2) + ',' + -(y-WIND_ARROW_R) + ' ' +
        (x+WIND_ARROW_WIDTH) + ',' + -y + ' ' +
        (x+WIND_ARROW_WIDTH/2) + ',' + -(y-WIND_ARROW_HEIGHT);
    return <Polygon points={points}
                    key={item.time}
                    fill="#3EA435"
                    transform={{
                        rotation: item.windBearing,
                        originX: x + WIND_ARROW_WIDTH/2,
                        originY: -(y - WIND_ARROW_HEIGHT/3)
                    }}
    />
}

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

export default WindChart;
