import React, {Fragment} from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import CustomText from "../../../components/CustomText";
import {connect} from "react-redux";

const MainDetailsList = ({currentForecast, dailyForecast, theme}) => {

    const imageStyle = [styles.image, {tintColor: theme.mainText}];
    const valueTextStyle = [styles.valueText, {color: theme.mainText}];
    const smallTitleTextStyle = [styles.smallTitleText, {color: theme.softText}];
    return (
        <Fragment>
            <View style={{flexDirection: 'row', paddingLeft: '5%', marginVertical: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/temperature.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{Math.round(dailyForecast[0].temp.max)}°/{Math.round(dailyForecast[0].temp.min)}°</CustomText>
                        <CustomText style={smallTitleTextStyle}>temperature</CustomText>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/sensed-temperature.png')}/>
                    <View style={{paddingLeft: 10, flexShrink: 1}}>
                        <CustomText style={valueTextStyle}>{Math.round(currentForecast.feels_like)}°</CustomText>
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
                        <CustomText style={valueTextStyle}>{Math.round(currentForecast.wind_speed*36)/10} km/h</CustomText>
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
        theme: state.theme
    }
}

export default connect(mapStateToProps)(MainDetailsList);
