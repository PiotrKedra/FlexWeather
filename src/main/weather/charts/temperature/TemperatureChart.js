import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from "../../../../resource/ImagePath";
import mapDataToIcon from "../common/ForecastIconMapper";
import COLORS from "../common/ChartColors";

const DEGREE_SIGN = '°';
const GRADIENT_ID = 'grad';

class TemperatureChart extends React.PureComponent {

  render = () => {
    const data = this.props.data;
    const minValue = d3.min(data, d => d.temperature);
    const maxValue = d3.max(data, d => d.temperature);
    const xFunction = this.getFunctionX(data, this.props.dimensions.svgWidth);
    const yFunction = this.getFunctionY(minValue, maxValue, this.props.dimensions.graphHeight, this.props.dimensions.initialYCordOfChart);

    return (
      <Svg width={this.props.dimensions.svgWidth} height={this.props.dimensions.svgHeight}>
        <G y={this.props.dimensions.svgHeight}>
          {this.getDefinitions()}

          {/* grid lines */}
          {this.generateVerticalBeginLine(this.props.dimensions.svgHeight)}
          {this.generateFullLengthLine(-this.props.dimensions.initialYCordOfChart - this.props.dimensions.graphHeight, this.props.dimensions.svgWidth)}
          {this.generateFullLengthLine(-this.props.dimensions.initialYCordOfChart - this.props.dimensions.graphHeight / 2, this.props.dimensions.svgWidth,50)}
          {this.generateFullLengthLine(-this.props.dimensions.initialYCordOfChart, this.props.dimensions.svgWidth)}
          {this.generateVerticalGridLines(data, xFunction, this.props.dimensions.graphHeight, this.props.dimensions.initialYCordOfChart)}

          {/* min & max values and data text*/}
          {this.generateSingleText('MAX ' + maxValue + DEGREE_SIGN, 13, -this.props.dimensions.initialYCordOfChart - this.props.dimensions.graphHeight - 2)}
          {this.generateSingleText('MIN ' + minValue + DEGREE_SIGN, 13, -this.props.dimensions.initialYCordOfChart - 2)}
          {this.generateDateText(data, this.props.dimensions.svgHeight)}

          {/* forecast images*/}
          {this.generateForecastImageForEach(data, xFunction, this.props.dimensions.graphHeight, this.props.dimensions.initialYCordOfChart)}
          {this.generateRainfallImageForEach(data, xFunction)}

          {/* temperature path */}
          {this.generateGradientComponent(data, xFunction, yFunction, this.props.dimensions.initialYCordOfChart)}
          {this.generateLineComponents(data, xFunction, yFunction)}
          {this.generateDotForEach(data, xFunction, yFunction)}

          {/* data values ( text for: hour, temperature, rainfall % ) */}
          {this.generateDegreeTextForEachItem(data, xFunction, yFunction)}
          {this.generateTextForEachItem(data, 'precipProbability', xFunction, 8, -20, 14)}
          {this.generateTextForEachItem(data, 'time', xFunction, 0, this.props.dimensions.svgHeight*-1 + 40, 20)}
        </G>
      </Svg>
    );
  };

  getFunctionX(data, svgWidth) {
    const xDomain = data.map(item => item.time);
    const xRange = [0, svgWidth];
    return d3
        .scalePoint()
        .domain(xDomain)
        .range(xRange)
        .padding(1);
  }

  getFunctionY(minValue, maxValue, graphHeight, initialYCordOfChart) {
    const yDomain = [minValue, maxValue];
    const yRange = [initialYCordOfChart, initialYCordOfChart + graphHeight];
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

  generateVerticalBeginLine(svgHeight) {
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

  generateFullLengthLine(y, svgWidth, xPadding = 0) {
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

  generateVerticalGridLines(data, x, graphHeight, initialYCordOfChart) {
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

  generateForecastImageForEach(data, x, graphHeight, initialYCordOfChart) {
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

  generateGradientComponent(data, x, y, initialYCordOfChart){
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

  generateDotForEach(data, x, y) {
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

  generateDateText(data, svgHeight) {
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

  generateDegreeTextForEachItem(data, x, y) {
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
