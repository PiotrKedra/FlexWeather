import {G, Polygon, Rect, Svg, Text} from 'react-native-svg';
import React from 'react';
import * as d3 from 'd3';
import {getFunctionY} from '../../hourly/svgcharts/utility/ChartDrawService';
import {getDaysText, getFunctionX, getGrid} from './utility/DailyChartDrawService';
import COLORS from '../../utility/ChartColors';
import {connect} from 'react-redux';
import {getWindValue} from '../../../../units/UnitsService';

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

const DailyWindChart = ({forecast, theme, weatherUnits}) => {
  const minValue = 0;
  const potentialMaxValue = d3.max(forecast, (d) => d.wind_speed);
  const maxValue = 10 < potentialMaxValue ? potentialMaxValue : 10;
  const xFunction = getFunctionX(forecast, SVG_WIDTH);
  const yFunction = getFunctionY(minValue, maxValue, 100, 60);

  const mainTextColor = theme.mainText;
  const softTextColor = theme.softText;

  return (
    <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      <G y={SVG_HEIGHT}>
        {getGrid(forecast, xFunction, 100, 60, softTextColor)}

        {getDaysText(forecast, xFunction, mainTextColor)}

        {getWindDirectionArrowsForEach(forecast, xFunction)}
        {getWindBearingStringForEach(forecast, xFunction, mainTextColor)}

        {getDataBars(forecast, xFunction, yFunction, maxValue, 60)}
        {getWindSpeedValues(forecast, xFunction, mainTextColor, weatherUnits.wind)}
      </G>
    </Svg>
  );
};

function getWindSpeedValues(forecast, xFunction, color, unit) {
  return (forecast.map((item) => (
    <Text
      key={item.dt}
      fontSize={18}
      x={xFunction(item.dt)}
      y={-30}
      textAnchor="middle"
      fill={color}
      fontFamily="Neucha-Regular">
      {getWindValue(item.wind_speed, unit)}
    </Text>
  )));
}

function getDataBars(data, x, y, maxValue, initialYCordOfChart) {
  if (maxValue===0) return null;
  return (data.map((item) => (
    <Rect
      key={item.dt}
      x={x(item.dt) - 3}
      y={y(item.wind_speed)*-1}
      rx={3}
      width={6}
      height={y(item.wind_speed) - initialYCordOfChart}
      fill={COLORS.green}
    />
  )));
}

function getWindDirectionArrowsForEach(data, xFunction) {
  return data.map((item) => (
    getWindArrow(item, xFunction)
  ));
}

const WIND_ARROW_WIDTH = 24;

const WIND_ARROW_HEIGHT = 30;
const WIND_ARROW_R = 5;
function getWindArrow(item, xFunction) {
  const x = xFunction(item.dt) - WIND_ARROW_WIDTH/2;
  const y = 250;
  const points = x + ',' + -y + ' ' +
        (x+WIND_ARROW_WIDTH/2) + ',' + -(y-WIND_ARROW_R) + ' ' +
        (x+WIND_ARROW_WIDTH) + ',' + -y + ' ' +
        (x+WIND_ARROW_WIDTH/2) + ',' + -(y-WIND_ARROW_HEIGHT);
  return <Polygon points={points}
    key={item.dt}
    fill={COLORS.green}
    opacity={0.8}
    transform={{
      rotation: item.wind_deg,
      originX: x + WIND_ARROW_WIDTH/2,
      originY: -(y - WIND_ARROW_HEIGHT/3),
    }}
  />;
}

function getWindBearingStringForEach(data, xFunction, color) {
  return data.map((item) => (
    <Text
      key={item.dt}
      fontSize="20"
      x={xFunction(item.dt)}
      y={-190}
      textAnchor="middle"
      fill={color}
      fontFamily="Neucha-Regular">
      {getWindDirectionString(item.wind_deg)}
    </Text>
  ));
}

function getWindDirectionString(windDirection) {
  if (windDirection < 23) {
    return 'N';
  } else if (windDirection < 68) {
    return 'NE';
  } else if (windDirection < 113) {
    return 'E';
  } else if (windDirection < 158) {
    return 'SE';
  } else if (windDirection < 203) {
    return 'S';
  } else if (windDirection < 248) {
    return 'SW';
  } else if (windDirection < 293) {
    return 'W';
  } else if (windDirection < 338) {
    return 'NW';
  } else {
    return 'N';
  }
}

function mapStateToProps(state) {
  return {
    forecast: state.rootForecastPerDay,
    theme: state.theme,
    weatherUnits: state.weatherUnits,
  };
}

export default connect(mapStateToProps)(DailyWindChart);
