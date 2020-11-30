import React from 'react';
import {connect} from 'react-redux';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from '../../../../../resource/ImagePath';
import COLORS from '../../utility/ChartColors';
import {
  getFunctionX,
  getFunctionY,
  getGrid,
  generateForecastImageForEach,
  generateDateText,
  getDataTextForEachItemAboveBars,
  getTimeLabels,
} from './utility/ChartDrawService';
import {getTempValue} from '../../../../units/UnitsService';

const DEGREE_SIGN = '°';
const GRADIENT_ID = 'grad';

const TemperatureChart = (props) => {
  const data = props.data;
  const svgWidth = props.dimensions.svgWidth;
  const svgHeight = props.dimensions.svgHeight;
  const graphHeight = props.dimensions.graphHeight;
  const initialYCordOfChart = props.dimensions.initialYCordOfChart;

  const minValue = d3.min(data, (d) => d.temp);
  const maxValue = d3.max(data, (d) => d.temp);

  const xFunction = getFunctionX(data, svgWidth);
  const yFunction = getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart);

  const mainTextColor = props.theme.mainText;
  const softTextColor = props.theme.softText;

  const tempUnit = props.weatherUnits ? props.weatherUnits.temp : '';

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G y={svgHeight}>
        {getDefinitions(props.weatherTheme.mainColor)}
        {getGrid(svgWidth, svgHeight, graphHeight, initialYCordOfChart, xFunction, data, softTextColor)}

        {
          generateSingleText(
              'MAX ' + getTempValue(maxValue, tempUnit) + DEGREE_SIGN,
              13,
              -initialYCordOfChart - graphHeight - 2,
              softTextColor)
        }
        {
          generateSingleText(
              'MIN ' + getTempValue(minValue, tempUnit) + DEGREE_SIGN,
              13,
              -initialYCordOfChart - 2,
              softTextColor)
        }
        {generateDateText(data, svgHeight, softTextColor)}

        {/* forecast images*/}
        {generateForecastImageForEach(data, xFunction, graphHeight, initialYCordOfChart)}
        {generateRainfallImageForEach(data, xFunction)}

        {/* temperature path */}
        {generateGradientComponent(data, xFunction, yFunction, initialYCordOfChart, props.weatherTheme.mainColor)}
        {generateLineComponents(data, xFunction, yFunction, props.weatherTheme.mainColor)}
        {generateDotForEach(data, xFunction, yFunction, props.weatherTheme.mainColor)}

        {/* data values ( text for: hour, temperature, rainfall % ) */}
        {getDataTextForEachItemAboveBars(data, xFunction, yFunction, 'temp', DEGREE_SIGN, mainTextColor, tempUnit)}
        {getRainData(data, xFunction, softTextColor)}
        {getTimeLabels(data, xFunction, svgHeight*-1 + 40, mainTextColor, props.weatherUnits.clock)}
      </G>
    </Svg>
  );
};

function getDefinitions(color=COLORS.pathBlue) {
  return <Defs>
    <LinearGradient id={GRADIENT_ID} x1="0" y1="1" x2="0" y2="0">
      <Stop offset="1" stopColor={color} stopOpacity="0.3"/>
      <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
    </LinearGradient>
  </Defs>;
}

function generateRainfallImageForEach(data, x) {
  return (data.map((item) => (
    <Image
      key={item.dt}
      x={x(item.dt) - 20}
      y={-35}
      width={17}
      height={17}
      preserveAspectRatio="xMidYMid slice"
      opacity="0.4"
      href={IMAGES.rainfallIcon}
    />
  )));
}

function getRainData(data, xFunction, color) {
  return (data.map((item) => (
    <Text
      key={item.dt}
      fontSize={14}
      x={xFunction(item.dt)}
      y={-20}
      textAnchor="start"
      fill={color}
      fontFamily="Neucha-Regular">
      {item.rain ? item.rain['1h']+'mm' : '0mm'}
    </Text>
  )));
}

function generateGradientComponent(data, x, y, initialYCordOfChart) {
  let polygonPoints = '';
  for (const item of data) {
    polygonPoints += Math.ceil(x(item.dt)) + ',' + -Math.ceil(y(item.temp)) + ' ';
  }
  polygonPoints += Math.ceil(x(data[data.length - 1].dt)) + ',' + -initialYCordOfChart + ' ' +
          Math.ceil(x(data[0].dt)) + ',' + -initialYCordOfChart;
  return (
    <Polygon
      points={polygonPoints}
      fill={'url(#' + GRADIENT_ID + ')'}
    />
  );
}

function generateLineComponents(data, x, y, color=COLORS.pathBlue) {
  const lineArray = [];
  for (let i = 0; i < data.length - 1; i++) {
    const x1 = x(data[i].dt);
    const y1 = y(data[i].temp);
    const x2 = x(data[i + 1].dt);
    const y2 = y(data[i + 1].temp);
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

function generateDotForEach(data, x, y, color) {
  return (data.map((item) => (
    <Circle
      key={item.dt}
      cx={x(item.dt)}
      cy={y(item.temp) * -1}
      r="2"
      fill={color}
    />
  )));
}

function generateSingleText(textValue, x, y, color) {
  return <Text
    fontSize="13"
    x={x}
    y={y}
    textAnchor="start"
    fill={color}
    fontFamily="Neucha-Regular">
    {textValue}
  </Text>;
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
    weatherTheme: state.weatherTheme,
    weatherUnits: state.weatherUnits,
  };
}

export default connect(mapStateToProps)(TemperatureChart);
