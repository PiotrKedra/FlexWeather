import React from 'react';
import { Svg, G, Line, Circle, Text } from 'react-native-svg'
import * as d3 from 'd3'
import {connect} from 'react-redux';
import * as Font from 'expo-font';

const svgWidth = 800;
const svgHeight = 200;

const graphHeight = 90;
const startYPointOfGraph = 50;


class LearnChart extends React.PureComponent {

    generateLineComponents(data, x, y) {
        let lineArray = [];
        for (let i = 0; i < data.length - 1; i++) {
            const x1 = x(data[i].label);
            const y1 = y(data[i].temp);
            const x2 = x(data[i+1].label);
            const y2 = y(data[i+1].temp);
            const lineComponent = (
                <Line
                    key={'bar' + data[i].label}
                    x1={x1}
                    y1={y1*-1}
                    x2={x2}
                    y2={y2*-1}
                    stroke="#5BC3CE"
                    strokeWidth="4"
                />
            );
            lineArray.push(lineComponent);
        }
        return lineArray;
    }

    getFunctionX(data){
        const xDomain = data.map(item => item.label);
        const xRange = [0, svgWidth];
        return d3.scalePoint()
            .domain(xDomain)
            .range(xRange)
            .padding(1);
    }

    getFunctionY(data){
        const maxValue = d3.max(data, d => d.temp);
        const minValue = d3.min(data, d => d.temp);
        const yDomain = [minValue, maxValue];
        const yRange = [startYPointOfGraph, startYPointOfGraph + graphHeight];
        return  d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);
    }

    render() {

        console.log(Font.isLoaded('Neucha'));
        const tmpData = [
            {label: "8:00", temp: 5},
            {label: "9:00", temp: 5},
            {label: "10:00", temp: 6},
            {label: "11:00", temp: 8},
            {label: "12:00", temp: 9},
            {label: "13:00", temp: 9},
            {label: "14:00", temp: 10},
            {label: "15:00", temp: 8},
            {label: "16:00", temp: 7},
            {label: "17:00", temp: 6},
            {label: "18:00", temp: 4},
        ];
        const colors = {
            axis: '#515151',
            bars: '#5BC3CE'
        };

        const x = this.getFunctionX(tmpData);
        const y = this.getFunctionY(tmpData);
        const maxValue = d3.max(tmpData, d => d.temp);
        const minValue = d3.min(tmpData, d => d.temp);

        let style;
        if (this.props.fontLoaded === true) {
            style = {fontFamily: 'Neucha'}
        }

        return (
            <Svg style={{borderWidth: 1}} width={svgWidth} height={svgHeight}>
                <G y={svgHeight}>
                    {this.generateLineComponents(tmpData, x, y)}
                    {tmpData.map(item => (
                        <Text
                            key={'t' + item.label}
                            fontSize="8"
                            x={x(item.label)}
                            y={y(item.temp)*-1 - 6}
                            textAnchor="middle">{item.temp}
                        </Text>
                    ))}
                    {tmpData.map(item => (
                        <Circle key={'c' + item.label} cx={x(item.label)} cy={y(item.temp)*-1} r="2" fill="#5BC3CE" />
                    ))}
                    {tmpData.map(item => (
                        <Text
                            key={'label' + item.label}
                            fontSize="8"
                            x={x(item.label)}
                            y="-10"
                            textAnchor="middle">{item.label}</Text>
                    ))}
                    <Line
                        x1={0}
                        y1={-startYPointOfGraph-graphHeight}
                        x2={svgWidth}
                        y2={-startYPointOfGraph-graphHeight}
                        stroke={colors.axis}
                        strokeDasharray={[3, 3]}
                        strokeWidth="0.5"
                    />
                    <Line
                        x1={0}
                        y1={-startYPointOfGraph}
                        x2={svgWidth}
                        y2={-startYPointOfGraph}
                        stroke={colors.axis}
                        strokeDasharray={[3, 3]}
                        strokeWidth="0.5"
                    />
                    <Text
                        fontFamily="Neucha"
                        fontSize="10"
                        x={20}
                        y={-startYPointOfGraph-graphHeight-1}
                        textAnchor="middle"
                        style={style}>MAX {maxValue}</Text>
                    <Text
                        fontSize="10"
                        x={20}
                        y={-startYPointOfGraph-1}
                        textAnchor="middle">min {minValue}</Text>
                </G>
            </Svg>
        )
    }
}

const mapStateToProps = (state) => {
    return { fontLoaded: state.fontLoaded };
};

export default connect(mapStateToProps)(LearnChart) ;
