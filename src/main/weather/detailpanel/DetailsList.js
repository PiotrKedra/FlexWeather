import React, {Fragment} from "react";
import {Image, View, StyleSheet} from "react-native";
import Text from "../../components/CustomText";
import {connect} from "react-redux";
import {getPressureValue, getTempValue, getVisibilityValue, getWindValue} from "../../units/UnitsService";

const DetailsList = ({forecast, theme, weatherUnits}) => {

    const imageStyle = [styles.image, {tintColor: theme.mainText}];
    const textValueStyle = [styles.textValue, {color: theme.mainText}];
    const textTitleStyle = [styles.textTitle, {color: theme.softText}];

    const windUnit = weatherUnits ? weatherUnits.wind : '';
    const pressureUnit = weatherUnits ? weatherUnits.pressure : '';
    const visibilityUnit = weatherUnits ? weatherUnits.visibility : '';

    return (
        <Fragment>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/wind-speed.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{getWindValue(forecast.wind_speed, windUnit)} {windUnit}</Text>
                        <Text style={textTitleStyle}>wind speed</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/wind-deg.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{getWindDirectionString(forecast.wind_deg)}</Text>
                        <Text style={textTitleStyle}>wind direction</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/pressure.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{getPressureValue(forecast.pressure, pressureUnit)} {pressureUnit}</Text>
                        <Text style={textTitleStyle}>pressure</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/humidity.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{forecast.humidity}%</Text>
                        <Text style={textTitleStyle}>humidity</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/cloud-cover.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{forecast.clouds}%</Text>
                        <Text style={textTitleStyle}>clouds cover</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/visibility.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{getVisibilityValue(forecast.visibility, visibilityUnit) + visibilityUnit} </Text>
                        <Text style={textTitleStyle}>visibility</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/uv-index.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{Math.round(forecast.uvi)}</Text>
                        <Text style={textTitleStyle}>uv index</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/dew-point.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{getTempValue(forecast.dew_point, weatherUnits ? weatherUnits.temp : '')}°</Text>
                        <Text style={textTitleStyle}>dew point</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/sunrise.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{parseTime(forecast.sunrise)}</Text>
                        <Text style={textTitleStyle}>sunrise</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={imageStyle} source={require('../../../../assets/images/details/sunset.png')}/>
                    <View style={styles.textView}>
                        <Text style={textValueStyle}>{parseTime(forecast.sunset)}</Text>
                        <Text style={textTitleStyle}>sunset</Text>
                    </View>
                </View>
            </View>
        </Fragment>
    )
}

function parseTime(timestamp){
    const date = new Date(timestamp*1000);
    return date.getHours() + ':' + date.getMinutes();
}

function getWindDirectionString(windDirection) {
    if(windDirection < 23)
        return 'North';
    else if (windDirection < 68)
        return 'North-East';
    else if (windDirection < 113)
        return 'East';
    else if (windDirection < 158)
        return 'South-East';
    else if (windDirection < 203)
        return 'South';
    else if (windDirection < 248)
        return 'South-West';
    else if (windDirection < 293)
        return 'West';
    else if (windDirection < 338)
        return 'North-West';
    else
        return 'North';
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        paddingLeft: '5%',
        marginVertical: 20
    },
    elementInRow: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 45,
        height: 45,
    },
    textView: {
        paddingLeft: 10,
        flexShrink: 1
    },
    textValue: {fontSize: 20},
    textTitle: {
        fontSize: 17,
        color: '#666'
    },
});

function mapStateToProps(state) {
    return {
        forecast: state.currentForecast,
        theme: state.theme,
        weatherUnits: state.weatherUnits
    }
}

export default connect(mapStateToProps)(DetailsList);
