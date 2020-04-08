import React from 'react';
import {Svg, G, Line, Circle, Text, Image, Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as d3 from 'd3';
import IMAGES from "../../../../resource/ImagePath";
import mapDataToIcon from "../common/ForecastIconMapper";


const COLORS = {
    mainText: '#111',
    pathBlue: '#5BC3CE',
    gridColor: 'rgba(81,81,81,0.3)',
    gradientLight: '#FFF'
};

class RainfallChart extends React.PureComponent {

    render = () => {

        const data = this.props.data;
        const minValue = d3.min(data, d => d.precipIntensity);
        const maxValue = d3.max(data, d => d.precipIntensity);
        console.log(data);
        const xFunction = this.getFunctionX(data, this.props.dimensions.svgWidth);
        const yFunction = this.getFunctionY(minValue, maxValue, this.props.dimensions.graphHeight, this.props.dimensions.initialYCordOfChart);

        return (
            <Svg width={this.props.dimensions.svgWidth} height={this.props.dimensions.svgHeight}>
                <G y={this.props.dimensions.svgHeight}>

                    {/* grid lines */}
                    {this.generateVerticalBeginLine(this.props.dimensions.svgHeight)}
                    {this.generateFullLengthLine(-this.props.dimensions.initialYCordOfChart - this.props.dimensions.graphHeight, this.props.dimensions.svgWidth)}
                    {this.generateFullLengthLine(-this.props.dimensions.initialYCordOfChart - this.props.dimensions.graphHeight / 2, this.props.dimensions.svgWidth, 50)}
                    {this.generateFullLengthLine(-this.props.dimensions.initialYCordOfChart, this.props.dimensions.svgWidth)}
                    {this.generateVerticalGridLines(data, xFunction, this.props.dimensions.graphHeight, this.props.dimensions.initialYCordOfChart)}

                    {/* day date text */}
                    {this.generateDateText(data, this.props.dimensions.svgHeight)}

                    {/* forecast images*/}
                    {this.generateForecastImageForEach(data, xFunction, this.props.dimensions.graphHeight, this.props.dimensions.initialYCordOfChart)}
                    {this.generateRainfallImageForEach(data, xFunction)}

                    {/* data values ( text for: hour, temperature, rainfall % ) */}
                    {this.generateDegreeTextForEachItem(data, xFunction, yFunction)}
                    {this.generateTextForEachItem(data, 'precipProbability', xFunction, 8, -20, 14)}
                    {this.generateTextForEachItem(data, 'time', xFunction, 0, (this.props.dimensions.initialYCordOfChart + this.props.dimensions.graphHeight) * -1 - 70, 20)}
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

    generateFullLengthLine(y, svgWidth, xPadding = 0 ) {
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
                y={(initialYCordOfChart + graphHeight) * -1 - 60}
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
                y={y(item.precipIntensity) * -1 - 6}
                textAnchor="middle"
                fill={COLORS.mainText}
                fontFamily="Neucha-Regular">
                {item.precipIntensity + 'ml/h'}
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

export default RainfallChart;
