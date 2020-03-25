import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from "../../../resource/ImagePath";


const SVG_WIDTH = 800;
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


class TemperatureChart extends React.Component {

  render() {
    const tmpData = [
      {label: '8:00', temp: 5, rain: '1%'},
      {label: '9:00', temp: 5, rain: '0%'},
      {label: '10:00', temp: 6, rain: '2%'},
      {label: '11:00', temp: 8, rain: '2%'},
      {label: '12:00', temp: 9, rain: '3%'},
      {label: '13:00', temp: 9, rain: '0%'},
      {label: '14:00', temp: 10, rain: '11%'},
      {label: '15:00', temp: 8, rain: '20%'},
      {label: '16:00', temp: 7, rain: '69%'},
      {label: '17:00', temp: 6, rain: '0%'},
      {label: '18:00', temp: 4, rain: '0%'},
    ];
    const data = this.props.data;

    const minValue = d3.min(data, d => d.temp);
    const maxValue = d3.max(data, d => d.temp);
    const xFunction = this.getFunctionX(data);
    const yFunction = this.getFunctionY(minValue, maxValue);

    return (
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        <G y={SVG_HEIGHT}>
          {this.getDefinitions()}

          {/* grid lines */}
          {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT)}
          {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT / 2, 50)}
          {this.generateFullLengthLine(-START_Y_POSITION_OF_GRAPH)}
          {this.generateVerticalGridLines(data, xFunction)}

          {/* min & max values*/}
          {this.generateSingleText('MAX ' + maxValue + DEGREE_SIGN, 10, -START_Y_POSITION_OF_GRAPH - GRAPH_HEIGHT - 2)}
          {this.generateSingleText('MIN ' + minValue + DEGREE_SIGN, 10, -START_Y_POSITION_OF_GRAPH - 2)}

          {/* forecast images*/}
          {this.generateForecastImageForEach(data, xFunction)}
          {this.generateRainfallImageForEach(data, xFunction)}

          {/* temperature path */}
          {this.generateGradientComponent(data, xFunction, yFunction)}
          {this.generateLineComponents(data, xFunction, yFunction)}
          {this.generateDotForEach(data, xFunction, yFunction)}

          {/* data values ( text for: hour, temp, rainfall % ) */}
          {this.generateDegreeTextForEachItem(data, xFunction, yFunction)}
          {this.generateTextForEachItem(data, 'rain', xFunction, 8, -20, 14)}
          {this.generateTextForEachItem(data, 'label', xFunction, 0, (START_Y_POSITION_OF_GRAPH + GRAPH_HEIGHT) * GRAPH_TRANSFORMATION - 70, 20)}
        </G>
      </Svg>
    );
  }

  getFunctionX(data) {
    const xDomain = data.map(item => item.label);
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

  generateFullLengthLine(y, xPadding = 0) {
    return <Line
        x1={xPadding}
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
            key={item.label}
            x1={x(item.label)}
            y1={-START_Y_POSITION_OF_GRAPH + 10}
            x2={x(item.label)}
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
              key={item.label}
              x={x(item.label) - 17}
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
            key={item.label}
            x={x(item.label) - 20}
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
      polygonPoints += Math.ceil(x(item.label)) + ',' + -Math.ceil(y(item.temp)) + ' ';
    }
    polygonPoints +=  Math.ceil(x(data[data.length - 1].label)) + ',' + -START_Y_POSITION_OF_GRAPH +  ' '
        + Math.ceil(x(data[0].label)) + ',' + -START_Y_POSITION_OF_GRAPH;
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
      const x1 = x(data[i].label);
      const y1 = y(data[i].temp);
      const x2 = x(data[i + 1].label);
      const y2 = y(data[i + 1].temp);
      const lineComponent = (
          <Line
              key={data[i].label}
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
              key={item.label}
              cx={x(item.label)}
              cy={y(item.temp) * GRAPH_TRANSFORMATION}
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

  generateDegreeTextForEachItem(data, x, y) {
    return (data.map(item => (
        <Text
            key={'degree' + item.label}
            fontSize={16}
            x={x(item.label)}
            y={y(item.temp) * GRAPH_TRANSFORMATION - 6}
            textAnchor="middle"
            fill={COLORS.mainText}
            fontFamily="Neucha-Regular">
          {item.temp + DEGREE_SIGN}
        </Text>
    )))
  }

  generateTextForEachItem(data, itemKey, xFunction, xShift, y, fontSize) {
    return (data.map(item => (
          <Text
              key={itemKey + item.label}
              fontSize={fontSize}
              x={xFunction(item.label) + xShift}
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
