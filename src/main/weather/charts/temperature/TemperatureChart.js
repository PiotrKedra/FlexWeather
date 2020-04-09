import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from "../../../../resource/ImagePath";
import mapDataToIcon from "../common/ForecastIconMapper";
import COLORS from "../common/ChartColors";

const DEGREE_SIGN = '°';
const GRADIENT_ID = 'grad';

const TemperatureChart = (props) => {

    const data = props.data;
    const svgWidth = props.dimensions.svgWidth;
    const svgHeight = props.dimensions.svgHeight;
    const graphHeight = props.dimensions.graphHeight;
    const initialYCordOfChart = props.dimensions.initialYCordOfChart;

    const minValue = d3.min(data, d => d.temperature);
    const maxValue = d3.max(data, d => d.temperature);
    const xFunction = getFunctionX(data, svgWidth);
    const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

    return (
        <Svg width={svgWidth} height={svgHeight}>
            <G y={svgHeight}>
                {getDefinitions()}

                {/* grid lines */}
                {generateVerticalBeginLine(svgHeight)}
                {generateFullLengthLine(-initialYCordOfChart - graphHeight, svgWidth)}
                {generateFullLengthLine(-initialYCordOfChart - graphHeight / 2, svgWidth,50)}
                {generateFullLengthLine(-initialYCordOfChart, svgWidth)}
                {generateVerticalGridLines(data, xFunction, graphHeight, initialYCordOfChart)}

                {/* min & max values and data text*/}
                {generateSingleText('MAX ' + maxValue + DEGREE_SIGN, 13, -initialYCordOfChart - graphHeight - 2)}
                {generateSingleText('MIN ' + minValue + DEGREE_SIGN, 13, -initialYCordOfChart - 2)}
                {generateDateText(data, svgHeight)}

                {/* forecast images*/}
                {generateForecastImageForEach(data, xFunction, graphHeight, initialYCordOfChart)}
                {generateRainfallImageForEach(data, xFunction)}

                {/* temperature path */}
                {generateGradientComponent(data, xFunction, yFunction, initialYCordOfChart)}
                {generateLineComponents(data, xFunction, yFunction)}
                {generateDotForEach(data, xFunction, yFunction)}

                {/* data values ( text for: hour, temperature, rainfall % ) */}
                {generateDegreeTextForEachItem(data, xFunction, yFunction)}
                {generateTextForEachItem(data, 'precipProbability', xFunction, 8, -20, 14)}
                {generateTextForEachItem(data, 'time', xFunction, 0, svgHeight*-1 + 40, 20)}
            </G>
        </Svg>
    )
};

function getFunctionX(data, svgWidth) {
  const xDomain = data.map(item => item.time);
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

function getDefinitions() {
  return <Defs>
    <LinearGradient id={GRADIENT_ID} x1="0" y1="1" x2="0" y2="0">
      <Stop offset="1" stopColor={COLORS.pathBlue} stopOpacity="0.3"/>
      <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
    </LinearGradient>
  </Defs>;
}

function generateVerticalBeginLine(svgHeight) {
  return <Line
      x1={10}
      y1={-20}
      x2={10}
      y2={-svgHeight}
      stroke={COLORS.gridColor}
      strokeDasharray={[3, 3]}
      strokeWidth="0.5"
  />;
}

function generateFullLengthLine(y, svgWidth, xPadding = 0) {
  return <Line
      x1={10 + xPadding}
      y1={y}
      x2={svgWidth - xPadding}
      y2={y}
      stroke={COLORS.gridColor}
      strokeDasharray={[3, 3]}
      strokeWidth="0.5"
  />;
}

function generateVerticalGridLines(data, x, graphHeight, initialYCordOfChart) {
  return (data.map(item => (
      <Line
          key={item.timeObject.timestamp}
          x1={x(item.time)}
          y1={-initialYCordOfChart + 10}
          x2={x(item.time)}
          y2={-initialYCordOfChart - graphHeight - 10}
          stroke={COLORS.gridColor}
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
      />
  )))
}

function generateForecastImageForEach(data, x, graphHeight, initialYCordOfChart) {
  return (data.map(item => (<Image
          key={item.timeObject.timestamp}
          x={x(item.time) - 17}
          y={(initialYCordOfChart + graphHeight) *-1 - 60}
          width={35}
          height={35}
          preserveAspectRatio="xMidYMid slice"
          opacity="0.8"
          href={mapDataToIcon(item.icon)}
      />)
  ))
}

function generateRainfallImageForEach(data, x) {
  return (data.map(item => (
      <Image
          key={item.timeObject.timestamp}
          x={x(item.time) - 20}
          y={-35}
          width={17}
          height={17}
          preserveAspectRatio="xMidYMid slice"
          opacity="0.4"
          href={IMAGES.rainfallIcon}
      />
  )))
}

function generateGradientComponent(data, x, y, initialYCordOfChart){
  let polygonPoints = "";
  for (let item of data) {
    polygonPoints += Math.ceil(x(item.time)) + ',' + -Math.ceil(y(item.temperature)) + ' ';
  }
  polygonPoints +=  Math.ceil(x(data[data.length - 1].time)) + ',' + -initialYCordOfChart +  ' '
      + Math.ceil(x(data[0].time)) + ',' + -initialYCordOfChart;
  return (
      <Polygon
          points={polygonPoints}
          fill={'url(#' + GRADIENT_ID + ')'}
      />
  )
}

function generateLineComponents(data, x, y) {
  let lineArray = [];
  for (let i = 0; i < data.length - 1; i++) {
    const x1 = x(data[i].time);
    const y1 = y(data[i].temperature);
    const x2 = x(data[i + 1].time);
    const y2 = y(data[i + 1].temperature);
    const lineComponent = (
        <Line
            key={data[i].timeObject.timestamp}
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

function generateDotForEach(data, x, y) {
  return (data.map(item => (
        <Circle
            key={item.timeObject.timestamp}
            cx={x(item.time)}
            cy={y(item.temperature) * -1}
            r="2"
            fill={COLORS.pathBlue}
        />
    )))
}

function generateSingleText(textValue, x, y) {
  return <Text
      fontSize="13"
      x={x}
      y={y}
      textAnchor="start"
      fill={COLORS.gridColor}
      fontFamily="Neucha-Regular">
    {textValue}
  </Text>;
}

function generateDateText(data, svgHeight) {
  return <Text
      fontSize="20"
      x={13}
      y={-svgHeight}
      textAnchor="start"
      fill={COLORS.gridColor}
      fontFamily="Neucha-Regular"
      transform="rotate(90, 3, -230)">
    {data[0].timeObject.day}
  </Text>;
}

function generateDegreeTextForEachItem(data, x, y) {
  return (data.map(item => (
      <Text
          key={'degree' + item.timeObject.timestamp}
          fontSize={16}
          x={x(item.time)}
          y={y(item.temperature) * -1 - 6}
          textAnchor="middle"
          fill={COLORS.mainText}
          fontFamily="Neucha-Regular">
        {item.temperature + DEGREE_SIGN}
      </Text>
  )))
}

function generateTextForEachItem(data, itemKey, xFunction, xShift, y, fontSize) {
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

export default TemperatureChart;
