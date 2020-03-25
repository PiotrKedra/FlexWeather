import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';

const svgWidth = 800;
const svgHeight = 240;

const graphHeight = 70;
const startYPointOfGraph = 60;

const DEGREE_SIGN = '°';

class LearnChart extends React.PureComponent {
  generateLineComponents(data, x, y) {
    let lineArray = [];
    for (let i = 0; i < data.length - 1; i++) {
      const x1 = x(data[i].label);
      const y1 = y(data[i].temp);
      const x2 = x(data[i + 1].label);
      const y2 = y(data[i + 1].temp);
      const lineComponent = (
        <Line
          key={'bar' + data[i].label}
          x1={x1}
          y1={y1 * -1}
          x2={x2}
          y2={y2 * -1}
          stroke="#5BC3CE"
          strokeWidth="4"
        />
      );
      lineArray.push(lineComponent);
    }
    return lineArray;
  }

  getFunctionX(data) {
    const xDomain = data.map(item => item.label);
    const xRange = [0, svgWidth];
    return d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);
  }

  getFunctionY(data) {
    const maxValue = d3.max(data, d => d.temp);
    const minValue = d3.min(data, d => d.temp);
    const yDomain = [minValue, maxValue];
    const yRange = [startYPointOfGraph, startYPointOfGraph + graphHeight];
    return d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);
  }

  generateGradientComponent(data, x, y){
    let polygonPoints = "";
    for (let item of data) {
      polygonPoints += Math.ceil(x(item.label)) + ',' + -Math.ceil(y(item.temp)) + ' ';
    }
    polygonPoints +=  Math.ceil(x(data[data.length - 1].label)) + ',' + -startYPointOfGraph +  ' '  + Math.ceil(x(data[0].label)) + ',' + -startYPointOfGraph;
    return (
        <Polygon
            points={polygonPoints}
            fill="url(#grad)"
        />
    )
  }

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
    const colors = {
      axis: '#515151',
      bars: '#5BC3CE',
    };

    const x = this.getFunctionX(tmpData);
    const y = this.getFunctionY(tmpData);
    const maxValue = d3.max(tmpData, d => d.temp);
    const minValue = d3.min(tmpData, d => d.temp);

    return (
      <Svg width={svgWidth} height={svgHeight}>
        <G y={svgHeight}>
          {this.getDefinitions()}

          {/* grid lines */}
          {this.generateFullLengthLine(-startYPointOfGraph - graphHeight)}
          {this.generateFullLengthLine(-startYPointOfGraph - graphHeight / 2, 50)}
          {this.generateFullLengthLine(-startYPointOfGraph)}
          {this.generateVerticalGridLines(tmpData, x)}

          {/* forecast images*/}
          {this.generateForecastImageForEach(tmpData, x)}
          {this.generateRainfallImageForEach(tmpData, x)}

          {/* temperature path */}
          {this.generateGradientComponent(tmpData, x, y)}
          {this.generateLineComponents(tmpData, x, y)}
          {this.generateDotForEach(tmpData, x, y)}

          {/* min & max values*/}
          {this.generateSingleText('MAX ' + maxValue + DEGREE_SIGN, 10, -startYPointOfGraph - graphHeight - 2)}
          {this.generateSingleText('MIN ' + minValue + DEGREE_SIGN, 10, -startYPointOfGraph - 2)}

          {/* data values ( text for: hour, temp, rainfall % ) */}
          {this.generateDegreeTextForEachItem(tmpData, x, y)}
          {this.generateTextForEachItem(tmpData, 'rain', x, 8, -20, 14)}
          {this.generateTextForEachItem(tmpData, 'label', x, 0, (startYPointOfGraph + graphHeight) * -1 - 70, 20)}
        </G>
      </Svg>
    );
  }

  getDefinitions() {
    return <Defs>
      <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
        <Stop offset="1" stopColor='#5BC3CE' stopOpacity="0.3"/>
        <Stop offset="0" stopColor="#FFF" stopOpacity="0"/>
      </LinearGradient>
    </Defs>;
  }

  generateForecastImageForEach(tmpData, x) {
    return <>
      {tmpData.map(item => (
          <Image
              x={x(item.label) - 17}
              y={(startYPointOfGraph + graphHeight) * -1 - 60}
              width={35}
              height={35}
              preserveAspectRatio="xMidYMid slice"
              opacity="0.6"
              href={require('../../../../assets/images/sun-cloud.png')}
          />
      ))}
    </>;
  }

  generateDotForEach(tmpData, x, y) {
    return <>
      {tmpData.map(item => (
          <Circle
              key={'dot' + item.label}
              cx={x(item.label)}
              cy={y(item.temp) * -1}
              r="2"
              fill="#5BC3CE"
          />
      ))}
    </>;
  }

  generateRainfallImageForEach(tmpData, x) {
    return <>
      {tmpData.map(item => (
          <Image
              x={x(item.label) - 20}
              y={-35}
              width={17}
              height={17}
              preserveAspectRatio="xMidYMid slice"
              opacity="0.4"
              href={require('../../../../assets/images/rain-umbrella.png')}
          />
      ))}
    </>;
  }

  generateTextForEachItem(tmpData, itemKey, xFunction, xShift, y, fontSize) {
    return <>
      {tmpData.map(item => (
          <Text
              key={itemKey + item.label}
              fontSize={fontSize}
              x={xFunction(item.label) + xShift}
              y={y}
              textAnchor="middle"
              fill="black"
              fontFamily="Neucha-Regular">
            {item[itemKey]}
          </Text>
      ))}
    </>;
  }

  generateDegreeTextForEachItem(data, x, y) {
    return <>
      {data.map(item => (
          <Text
              key={'degree' + item.label}
              fontSize={16}
              x={x(item.label)}
              y={y(item.temp) * -1 - 6}
              textAnchor="middle"
              fill="black"
              fontFamily="Neucha-Regular">
            {item.temp + DEGREE_SIGN}
          </Text>
      ))}
    </>;
  }

  generateVerticalGridLines(data, x) {
    return <>
      {data.map(item => (
          <Line
              x1={x(item.label)}
              y1={-startYPointOfGraph + 10}
              x2={x(item.label)}
              y2={-startYPointOfGraph - graphHeight - 10}
              stroke={'rgba(81,81,81,0.3)'}
              strokeDasharray={[3, 3]}
              strokeWidth="0.5"
          />
      ))}
    </>;
  }

  generateFullLengthLine(y, xPadding = 0) {
    return <Line
        x1={xPadding}
        y1={y}
        x2={svgWidth - xPadding}
        y2={y}
        stroke={'rgba(81,81,81,0.3)'}
        strokeDasharray={[3, 3]}
        strokeWidth="0.5"
    />;
  }

  generateSingleText(textValue, x, y) {
    return <Text
        fontSize="13"
        x={x}
        y={y}
        textAnchor="start"
        fill="black"
        fillOpacity={0.3}
        fontFamily="Neucha-Regular">
      {textValue}
    </Text>;
  }


}

export default LearnChart;
