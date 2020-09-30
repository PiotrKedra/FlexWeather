import React from "react";
import {
    G,
    Polygon,
    Rect,
    Svg,
    Text
} from "react-native-svg";
import {connect} from 'react-redux';
import * as d3 from "d3";

import {
    getFunctionX,
    getFunctionY,
    getGrid,
    generateDateText,
    getTimeLabels,
} from "./utility/ChartDrawService";
import COLORS from "../../utility/ChartColors";
import {getWindValue} from "../../../../units/UnitsService";

const WindChart = (props) => {

    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = 0;
    const maxValue = getMaxValue(data);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    const mainTextColor = props.theme.mainText;
    const softTextColor = props.theme.softText;

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>
                {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data, softTextColor)}
                {generateDateText(data, svgHeight, softTextColor)}

                {getWindDirectionArrowsForEach(data, xFunction)}
                {generateDataBars(data, xFunction, yFunction, maxValue, initialYCordOfChart)}

                {getWindBearingStringForEach(data, xFunction, mainTextColor)}
                {getDataTextForEachItemAboveBars(data, xFunction, yFunction, mainTextColor, props.weatherUnits.wind)}
                {getTimeLabels(data, xFunction, svgHeight * -1 + 40, mainTextColor, props.weatherUnits.clock)}
            </G>
        </Svg>
    )
};

function getDataTextForEachItemAboveBars(data, x, y, color, unit) {
    return (data.map(item => (
        <Text
            key={item.dt}
            fontSize={16}
            x={x(item.dt)}
            y={y(item.wind_speed) * -1 - 6}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {getWindValue(item.wind_speed, unit)}
        </Text>
    )))
}

function getMaxValue(data){
    const max = d3.max(data, d => d.windSpeed);
    const defaultMax = 10;
    return (max > defaultMax) ? max : defaultMax;
}

function generateDataBars(data, x, y, maxValue, initialYCordOfChart) {
    if(maxValue===0) return null;
    return (data.map(item => (
        <Rect
            key={item.dt}
            x={x(item.dt) - 3}
            y={y(item.wind_speed)*-1}
            rx={3}
            width={6}
            height={y(item.wind_speed) - initialYCordOfChart}
            fill={COLORS.green}
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
    const x = xFunction(item.dt) - WIND_ARROW_WIDTH/2;
    const y = 180;
    const points = x + ',' + -y + ' ' +
        (x+WIND_ARROW_WIDTH/2) + ',' + -(y-WIND_ARROW_R) + ' ' +
        (x+WIND_ARROW_WIDTH) + ',' + -y + ' ' +
        (x+WIND_ARROW_WIDTH/2) + ',' + -(y-WIND_ARROW_HEIGHT);
    return <Polygon points={points}
                    key={item.dt}
                    fill={COLORS.green}
                    opacity={0.8}
                    transform={{
                        rotation: item.wind_deg,
                        originX: x + WIND_ARROW_WIDTH/2,
                        originY: -(y - WIND_ARROW_HEIGHT/3)
                    }}
    />
}

function getWindBearingStringForEach(data, xFunction, color) {
    return data.map(item => (
        <Text
            key={item.dt}
            fontSize="20"
            x={xFunction(item.dt)}
            y={-130}
            textAnchor="middle"
            fill={color}
            fontFamily="Neucha-Regular">
            {getWindDirectionString(item.wind_deg)}
        </Text>
    ))
}

function getWindDirectionString(windDirection) {
    if(windDirection < 23)
        return 'N';
    else if (windDirection < 68)
        return 'NE';
    else if (windDirection < 113)
        return 'E';
    else if (windDirection < 158)
        return 'SE';
    else if (windDirection < 203)
        return 'S';
    else if (windDirection < 248)
        return 'SW';
    else if (windDirection < 293)
        return 'W';
    else if (windDirection < 338)
        return 'NW';
    else
        return 'N';
}

function mapStateToProps(state){
    return {
        theme: state.theme,
        weatherUnits: state.weatherUnits
    }
}

export default connect(mapStateToProps)(WindChart);
