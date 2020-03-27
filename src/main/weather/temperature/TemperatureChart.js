import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from "../../../resource/ImagePath";


let SVG_WIDTH = 600;
const SVG_HEIGHT = 240;
const GRAPH_HEIGHT = 70;
const START_Y_POSITION_OF_GRAPH = 60;
const GRAPH_TRANSFORMATION = -1;

const DEGREE_SIGN = '°';
const GRADIENT_ID = 'grad';

const COLORS = {
  mainText: '#111',
  pathBlue: '#5BC3CE',
  gridColor: 'rgba(81,81,81,0.3)',
  gradientLight: '#FFF'
};


class TemperatureChart extends React.PureComponent {

  render() {
    SVG_WIDTH = 80 * this.props.data.length;

    const data = this.props.data;
    const minValue = d3.min(data, d => d.temperature);
    const maxValue = d3.max(data, d => d.temperature);
    const xFunction = this.getFunctionX(data);
    const yFunction = this.getFunctionY(minValue, maxValue);

    return (
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        <G y={SVG_HEIGHT}>
          {this.getDefinitions()}

          {/* grid lines */}
          {this.generateVerticalBeginLine()}
          {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT)}
          {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT / 2, 50)}
          {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH)}
          {this.generateVerticalGridLines(data, xFunction)}

          {/* min & max values and data text*/}
          {this.generateSingleText('MAX ' + maxValue + DEGREE_SIGN, 13, -START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT - 2)}
          {this.generateSingleText('MIN ' + minValue + DEGREE_SIGN, 13, -START_Y_POSITION_OF_GRAPH - 2)}
          {this.generateDateText(data)}

          {/* forecast images*/}
          {this.generateForecastImageForEach(data, xFunction)}
          {this.generateRainfallImageForEach(data, xFunction)}

          {/* temperature path */}
          {this.generateGradientComponent(data, xFunction, yFunction)}
          {this.generateLineComponents(data, xFunction, yFunction)}
          {this.generateDotForEach(data, xFunction, yFunction)}

          {/* data values ( text for: hour, temperature, rainfall % ) */}
          {this.generateDegreeTextForEachItem(data, xFunction, yFunction)}
          {this.generateTextForEachItem(data, 'precipProbability', xFunction, 8, -20, 14)}
          {this.generateTextForEachItem(data, 'time', xFunction, 0, (START_Y_POSITION_OF_GRAPH + GRAPH_HEIGHT) * GRAPH_TRANSFORMATION - 70, 20)}
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

  getDefinitions() {
    return <Defs>
      <LinearGradient id={GRADIENT_ID} x1="0" y1="1" x2="0" y2="0">
        <Stop offset="1" stopColor={COLORS.pathBlue} stopOpacity="0.3"/>
        <Stop offset="0" stopColor={COLORS.gradientLight} stopOpacity="0"/>
      </LinearGradient>
    </Defs>;
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

  generateForecastImageForEach(data, x) {
    return (data.map(item => (
          <Image
              key={item.timeObject.timestamp}
              x={x(item.time) - 17}
              y={(START_Y_POSITION_OF_GRAPH + GRAPH_HEIGHT) * GRAPH_TRANSFORMATION - 60}
              width={35}
              height={35}
              preserveAspectRatio="xMidYMid slice"
              opacity="0.6"
              href={IMAGES.sunCloudIcon}
          />
      )))
  }

  generateRainfallImageForEach(data, x) {
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

  generateGradientComponent(data, x, y){
    let polygonPoints = "";
    for (let item of data) {
      polygonPoints += Math.ceil(x(item.time)) + ',' + -Math.ceil(y(item.temperature)) + ' ';
    }
    polygonPoints +=  Math.ceil(x(data[data.length - 1].time)) + ',' + -START_Y_POSITION_OF_GRAPH +  ' '
        + Math.ceil(x(data[0].time)) + ',' + -START_Y_POSITION_OF_GRAPH;
    return (
        <Polygon
            points={polygonPoints}
            fill={'url(#' + GRADIENT_ID + ')'}
        />
    )
  }

  generateLineComponents(data, x, y) {
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
              y1={y1 * GRAPH_TRANSFORMATION}
              x2={x2}
              y2={y2 * GRAPH_TRANSFORMATION}
              stroke={COLORS.pathBlue}
              strokeWidth="4"
          />
      );
      lineArray.push(lineComponent);
    }
    return lineArray;
  }

  generateDotForEach(data, x, y) {
    return (data.map(item => (
          <Circle
              key={item.timeObject.timestamp}
              cx={x(item.time)}
              cy={y(item.temperature) * GRAPH_TRANSFORMATION}
              r="2"
              fill={COLORS.pathBlue}
          />
      )))
  }

  generateSingleText(textValue, x, y) {
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

  generateDegreeTextForEachItem(data, x, y) {
    return (data.map(item => (
        <Text
            key={'degree' + item.timeObject.timestamp}
            fontSize={16}
            x={x(item.time)}
            y={y(item.temperature) * GRAPH_TRANSFORMATION - 6}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
          {item.temperature + DEGREE_SIGN}
        </Text>
    )))
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

export default TemperatureChart;
