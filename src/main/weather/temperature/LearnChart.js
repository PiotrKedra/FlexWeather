import React from 'react';
import { View } from 'react-native';
import { Svg, G, Line, Rect, Text } from 'react-native-svg'
import * as d3 from 'd3'
import {data} from "react-native-chart-kit/data";
import {max} from "react-native-reanimated";

class LearnChart extends React.PureComponent {

    render() {
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
            bars: '#15AD13'
        };

        const svgWidth = 600;
        const svgHeight = 150;

        // X scale point
        const xDomain = tmpData.map(item => item.label);
        const xRange = [0, svgWidth];
        const x = d3.scalePoint()
            .domain(xDomain)
            .range(xRange)
            .padding(1);

        // Y scale linear
        const maxValue = d3.max(tmpData, d => d.temp);
        const minValue = d3.min(tmpData, d => d.temp);
        const yDomain = [minValue, maxValue];
        const yRange = [30, 130];
        const y = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);


        return (
            <Svg style={{borderWidth: 1}} width={svgWidth} height={svgHeight}>
                <G y={svgHeight}>

                    {generateLineComponents(tmpData)}

                    {tmpData.map(item => (
                        <Text
                            key={'c' + item.label}
                            fontSize="8"
                            x={x(item.label)}
                            y={y(item.temp)*-1 - 6}
                            textAnchor="middle">{item.temp}</Text>
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
                        y1={-130}
                        x2={svgWidth}
                        y2={-130}
                        stroke={colors.axis}
                        strokeDasharray={[3, 3]}
                        strokeWidth="0.5"
                    />
                    <Line
                        x1="0"
                        y1="-30"
                        x2={svgWidth}
                        y2="-30"
                        stroke={colors.axis}
                        strokeDasharray={[3, 3]}
                        strokeWidth="0.5"
                    />
                    <Text
                        fontSize="10"
                        x={20}
                        y={-131}
                        textAnchor="middle">max: {maxValue}</Text>
                    <Text
                        fontSize="10"
                        x={20}
                        y={-31}
                        textAnchor="middle">min: {minValue}</Text>
                </G>
            </Svg>
        )
    }
}

function generateLineComponents(data) {
    const svgWidth = 600;
    const svgHeight = 100;

    // X scale point
    const xDomain = data.map(item => item.label);
    const xRange = [0, svgWidth];
    const x = d3.scalePoint()
        .domain(xDomain)
        .range(xRange)
        .padding(1);

    // Y scale linear
    const maxValue = d3.max(data, d => d.temp);
    const minValue = d3.min(data, d => d.temp);
    const yDomain = [minValue, maxValue];
    const yRange = [30, 130];
    const y = d3.scaleLinear()
        .domain(yDomain)
        .range(yRange);

    let lineArray = [];
    for (let i = 0; i < data.length - 1; i++) {
        const x1 = x(data[i].label);
        const y1 = y(data[i].temp);
        console.log(y1);

        const x2 = x(data[i+1].label);
        const y2 = y(data[i+1].temp);

        const lineComponent = (
            <Line
                key={'bar' + data[i].label}
                x1={x1}
                y1={y1*-1}
                x2={x2}
                y2={y2*-1}
                stroke="red"
                strokeWidth="4"
            />
        );
        lineArray.push(lineComponent);
    }
    return lineArray;

}

export default LearnChart;
