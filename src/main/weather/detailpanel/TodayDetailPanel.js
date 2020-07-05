import React from 'react';
import {Image, StyleSheet, View} from "react-native";

import Text from '../../components/CustomText';
import {connect} from "react-redux";

const TodayDetailPanel = ({forecast, theme}) => {

    return (
        <View style={[styles.tab, {backgroundColor: theme.panelColor}]}>
            <Text style={styles.mainTitleText}>Precise forecast</Text>
            <Text style={styles.descriptionText}>
                More details
            </Text>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/wind-speed.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{Math.round(forecast.wind_speed*36)/10} km/h</Text>
                        <Text style={styles.textTitle}>wind speed</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/wind-deg.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{getWindDirectionString(forecast.wind_deg)}</Text>
                        <Text style={styles.textTitle}>wind direction</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/pressure.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{forecast.pressure} hPa</Text>
                        <Text style={styles.textTitle}>pressure</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/humidity.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{forecast.humidity}%</Text>
                        <Text style={styles.textTitle}>humidity</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/cloud-cover.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{forecast.clouds}%</Text>
                        <Text style={styles.textTitle}>clouds cover</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/visibility.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{forecast.visibility}m</Text>
                        <Text style={styles.textTitle}>visibility</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/uv-index.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{Math.round(forecast.uvi)}</Text>
                        <Text style={styles.textTitle}>uv index</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/dew-point.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{Math.round(forecast.dew_point)}°</Text>
                        <Text style={styles.textTitle}>dew point</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/sunrise.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{parseTime(forecast.sunrise)}</Text>
                        <Text style={styles.textTitle}>sunrise</Text>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <Image style={styles.image} source={require('../../../../assets/images/details/sunset.png')}/>
                    <View style={styles.textView}>
                        <Text style={styles.textValue}>{parseTime(forecast.sunset)}</Text>
                        <Text style={styles.textTitle}>sunset</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

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
    tab: {
        marginTop: 10,
        width: '95%',
        backgroundColor: '#EEE',
        borderRadius: 20,
    },
    mainTitleText: {
        fontSize: 30,
        paddingLeft: '5%',
        color: 'rgb(33,33,33)',
        marginTop: 10,
    },
    descriptionText: {
        fontSize: 18,
        color: '#777',
        paddingLeft: '5%'
    },
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
        height: 45
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
        theme: state.theme
    }
}

export default connect(mapStateToProps)(TodayDetailPanel);


