import React, {Fragment} from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import CustomText from "../../../components/CustomText";
import {connect} from "react-redux";
import {getTempValue, getWindValue} from "../../../units/UnitsService";

const MainDetailsList = ({currentForecast, dailyForecast, theme, weatherUnits}) => {

    const imageStyle = [styles.image, {tintColor: theme.mainText}];
    const valueTextStyle = [styles.valueText, {color: theme.mainText}];
    const smallTitleTextStyle = [styles.smallTitleText, {color: theme.softText}];

    const tempUnit = weatherUnits ? weatherUnits.temp : '';
    const windUnit = weatherUnits ? weatherUnits.wind : '';

    return (
        <Fragment>
            <View style={{flexDirection: 'row', paddingLeft: '5%', marginVertical: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/temperature.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{getTempValue(dailyForecast[0].temp.max, tempUnit)}°/{getTempValue(dailyForecast[0].temp.min, tempUnit)}°</CustomText>
                        <CustomText style={smallTitleTextStyle}>temperature</CustomText>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/sensed-temperature.png')}/>
                    <View style={{paddingLeft: 10, flexShrink: 1}}>
                        <CustomText style={valueTextStyle}>{getTempValue(currentForecast.feels_like, tempUnit)}°</CustomText>
                        <Text style={[smallTitleTextStyle, {fontFamily: 'Neucha-Regular'}]}>sensed temperature</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', paddingLeft: '5%', marginBottom: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/rainfall.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{dailyForecast[0].rain ? dailyForecast[0].rain : 0} mm</CustomText>
                        <CustomText style={smallTitleTextStyle}>rainfall</CustomText>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/wind-speed.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{getWindValue(currentForecast.wind_speed, windUnit)} {windUnit}</CustomText>
                        <CustomText style={smallTitleTextStyle}>wind speed</CustomText>
                    </View>
                </View>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 45,
        height: 45
    },
    valueText: {
        fontSize: 20
    },
    smallTitleText: {
        fontSize: 17
    },
});

function mapStateToProps(state){
    return {
        currentForecast: state.currentForecast,
        dailyForecast: state.rootForecastPerDay,
        theme: state.theme,
        weatherUnits: state.weatherUnits
    }
}

export default connect(mapStateToProps)(MainDetailsList);
