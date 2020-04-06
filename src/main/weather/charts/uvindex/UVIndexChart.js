import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from "../../../../resource/ImagePath";
import mapDataToIcon from "../common/ForecastIconMapper";


let SVG_WIDTH = 600;
const SVG_HEIGHT = 240;
const GRAPH_HEIGHT = 100;
const START_Y_POSITION_OF_GRAPH = 60;
const GRAPH_TRANSFORMATION = -1;

const DEGREE_SIGN = '°';
const GRADIENT_ID = 'grad';

const COLORS = {
    mainText: '#111',
    pathBlue: '#62EA43',
    gridColor: 'rgba(81,81,81,0.3)',
    gradientLight: '#FFF'
};


class UVIndexChart extends React.PureComponent {

    render() {
        SVG_WIDTH = 60 * this.props.data.length;

        const data = this.props.data;
        const minValue = d3.min(data, d => d.uvIndex);
        const maxValue = d3.max(data, d => d.uvIndex);
        console.log(data);
        const xFunction = this.getFunctionX(data);
        const yFunction = this.getFunctionY(minValue, maxValue);

        return (
            <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                <G y={SVG_HEIGHT}>

                    {/* grid lines */}
                    {this.generateVerticalBeginLine()}
                    {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT)}
                    {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT / 2, 50)}
                    {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH)}
                    {this.generateVerticalGridLines(data, xFunction)}

                    {/* day date text */}
                    {this.generateDateText(data)}

                    {this.generateDataBars(data, xFunction, yFunction, maxValue)}

                    {/* data values ( text for: hour, temperature, rainfall % ) */}
                    {this.generateTextForEachItem(data, 'uvIndex', xFunction, 0, -20, 14)}
                    {this.generateTextForEachItem(data, 'time', xFunction, 0, (START_Y_POSITION_OF_GRAPH + GRAPH_HEIGHT) * GRAPH_TRANSFORMATION - 20, 20)}
                </G>
            </Svg>
        );
    }

    getFunctionX(data) {
        const xDomain = data.map(item => item.time);
        const xRange = [0, SVG_WIDTH];
        return d3
            .scalePoint()
            .domain(xDomain)
            .range(xRange)
            .padding(1);
    }

    getFunctionY(minValue, maxValue) {
        const yDomain = [minValue, maxValue];
        const yRange = [START_Y_POSITION_OF_GRAPH, START_Y_POSITION_OF_GRAPH + GRAPH_HEIGHT];
        return d3
            .scaleLinear()
            .domain(yDomain)
            .range(yRange);
    }

    generateVerticalBeginLine() {
        return <Line
            x1={10}
            y1={-20}
            x2={10}
            y2={-SVG_HEIGHT}
            stroke={COLORS.gridColor}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />;
    }

    generateFullLengthLine(y, xPadding = 0) {
        return <Line
            x1={10 + xPadding}
            y1={y}
            x2={SVG_WIDTH - xPadding}
            y2={y}
            stroke={COLORS.gridColor}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
        />;
    }

    generateVerticalGridLines(data, x) {
        return (data.map(item => (
            <Line
                key={item.timeObject.timestamp}
                x1={x(item.time)}
                y1={-START_Y_POSITION_OF_GRAPH + 10}
                x2={x(item.time)}
                y2={-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT - 10}
                stroke={COLORS.gridColor}
                strokeDasharray={[3, 3]}
                strokeWidth="0.5"
            />
        )))
    }

    generateDataBars(data, x, y, maxValue) {
        if(maxValue===0) return null;
        return (data.map(item => (
            <Rect
                key={'bar' + item.time}
                x={x(item.time) - 5}
                y={y(item.uvIndex)*-1}
                rx={2.5}
                width={5}
                height={y(item.uvIndex) - START_Y_POSITION_OF_GRAPH}
                fill={COLORS.pathBlue}
            />
        )))
    }

    generateDateText(data) {
        return <Text
            fontSize="20"
            x={13}
            y={-SVG_HEIGHT}
            textAnchor="start"
            fill={COLORS.gridColor}
            fontFamily="Neucha-Regular"
            transform="rotate(90, 3, -230)">
            {data[0].timeObject.day}
        </Text>;
    }

    generateTextForEachItem(data, itemKey, xFunction, xShift, y, fontSize) {
        return (data.map(item => (
            <Text
                key={itemKey + item.timeObject.timestamp}
                fontSize={fontSize}
                x={xFunction(item.time) + xShift}
                y={y}
                textAnchor="middle"
                fill={COLORS.mainText}
                fontFamily="Neucha-Regular">
                {item[itemKey]}
            </Text>
        )))
    }
}

export default UVIndexChart;
