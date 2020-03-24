import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import {connect} from 'react-redux';

const svgWidth = 800;
const svgHeight = 250;

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

    console.log(polygonPoints);

    return (
        <Polygon
            points={polygonPoints}
            fill="url(#grad)"
        />
    )
  }

  render() {
    const tmpData = [
      {label: '8:00', temp: 5},
      {label: '9:00', temp: 5},
      {label: '10:00', temp: 6},
      {label: '11:00', temp: 8},
      {label: '12:00', temp: 9},
      {label: '13:00', temp: 9},
      {label: '14:00', temp: 10},
      {label: '15:00', temp: 8},
      {label: '16:00', temp: 7},
      {label: '17:00', temp: 6},
      {label: '18:00', temp: 4},
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
      <Svg style={{borderWidth: 1}} width={svgWidth} height={svgHeight}>
        <G y={svgHeight}>
          {this.generateGradientComponent(tmpData, x, y)}

          {this.generateLineComponents(tmpData, x, y)}
          {tmpData.map(item => (
            <Text
              key={'t' + item.label}
              fontSize="16"
              x={x(item.label)}
              y={y(item.temp) * -1 - 6}
              textAnchor="middle"
              fill="black"
              fontFamily="Neucha-Regular">
              {item.temp + DEGREE_SIGN}
            </Text>
          ))}
          {tmpData.map(item => (
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
          <Defs>
            <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
              <Stop offset="1" stopColor='#5BC3CE' stopOpacity="0.3" />
              <Stop offset="0" stopColor="#FFF" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          {tmpData.map(item => (
            <Circle
              key={'c' + item.label}
              cx={x(item.label)}
              cy={y(item.temp) * -1}
              r="2"
              fill="#5BC3CE"
            />
          ))}
          {tmpData.map(item => (
              <Image
                  x={x(item.label) - 17}
                  y={(startYPointOfGraph + graphHeight) * -1 - 60}
                  width={35}
                  height={35}
                  preserveAspectRatio="xMidYMid slice"
                  opacity="0.6"
                  href={require('../../../../assets/images/sun-cloud.png')}
                  clipPath="url(#clip)"
              />
          ))}
          {tmpData.map(item => (
              <Image
                  x={x(item.label) - 17}
                  y={-30}
                  width={20}
                  height={20}
                  preserveAspectRatio="xMidYMid slice"
                  opacity="0.4"
                  href={require('../../../../assets/images/rain-umbrella.png')}
                  clipPath="url(#clip)"
              />
          ))}
          {tmpData.map(item => (
              <Text
                  key={'ttt' + item.label}
                  fontSize="14"
                  x={x(item.label) - 17}
                  y={-30}
                  textAnchor="middle"
                  fill="black"
                  fontFamily="Neucha-Regular">
                11%
              </Text>
          ))}
          {tmpData.map(item => (
            <Text
              key={'label' + item.label}
              fontSize="20"
              x={x(item.label)}
              y={(startYPointOfGraph + graphHeight) * -1 - 70}
              textAnchor="middle"
              fill="black"
              fontFamily="Neucha-Regular">
              {item.label}
            </Text>
          ))}
          <Line
            x1={0}
            y1={-startYPointOfGraph - graphHeight}
            x2={svgWidth}
            y2={-startYPointOfGraph - graphHeight}
            stroke={'rgba(81,81,81,0.3)'}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />
          <Line
              x1={50}
              y1={-startYPointOfGraph - graphHeight/2}
              x2={svgWidth - 50}
              y2={-startYPointOfGraph - graphHeight/2}
              stroke={'rgba(81,81,81,0.3)'}
              strokeDasharray={[3, 3]}
              strokeWidth="0.5"
          />
          <Line
            x1={0}
            y1={-startYPointOfGraph}
            x2={svgWidth}
            y2={-startYPointOfGraph}
            stroke={'rgba(81,81,81,0.3)'}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />
          <Text
            fontSize="13"
            x={20}
            y={-startYPointOfGraph - graphHeight - 1}
            textAnchor="middle"
            fill="black"
            fillOpacity={0.3}
            fontFamily="Neucha-Regular">
            MAX {maxValue + DEGREE_SIGN}
          </Text>
          <Text
            fontSize="13"
            x={20}
            y={-startYPointOfGraph - 1}
            textAnchor="middle"
            fill="black"
            fillOpacity={0.3}
            fontFamily="Neucha-Regular">
            min {minValue + DEGREE_SIGN}
          </Text>

        </G>
      </Svg>
    );
  }
}

const mapStateToProps = state => {
  return {fontLoaded: state.fontLoaded};
};

export default connect(mapStateToProps)(LearnChart);
