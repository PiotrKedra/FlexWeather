import React, {Fragment} from "react";
import {Image, Text, View} from "react-native";
import CustomText from "../../../components/CustomText";

const MainDetailsList = () => {

    const imageStyle = [styles.image, {tintColor: this.props.theme.mainText}];
    const valueTextStyle = [styles.valueText, {color: this.props.theme.mainText}];
    const smallTitleTextStyle = [styles.smallTitleText, {color: this.props.theme.softText}];
    return (
        <Fragment>
            <View style={{flexDirection: 'row', paddingLeft: '5%', marginVertical: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/temperature.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{Math.round(this.props.dailyForecast[0].temp.max)}°/{Math.round(this.props.dailyForecast[0].temp.min)}°</CustomText>
                        <CustomText style={smallTitleTextStyle}>temperature</CustomText>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/sensed-temperature.png')}/>
                    <View style={{paddingLeft: 10, flexShrink: 1}}>
                        <CustomText style={valueTextStyle}>{Math.round(this.props.currentForecast.feels_like)}°</CustomText>
                        <Text style={[smallTitleTextStyle, {fontFamily: 'Neucha-Regular'}]}>sensed temperature</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', paddingLeft: '5%', marginBottom: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/rainfall.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{this.props.dailyForecast[0].rain ? this.props.dailyForecast[0].rain : 0} mm</CustomText>
                        <CustomText style={smallTitleTextStyle}>rainfall</CustomText>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={imageStyle} source={require('../../../../../assets/images/details/wind-speed.png')}/>
                    <View style={{paddingLeft: 10}}>
                        <CustomText style={valueTextStyle}>{Math.round(this.props.currentForecast.wind_speed*36)/10} km/h</CustomText>
                        <CustomText style={smallTitleTextStyle}>wind speed</CustomText>
                    </View>
                </View>
            </View>
        </Fragment>
    )
}

export default MainDetailsList;
