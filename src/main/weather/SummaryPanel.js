import React from 'react';
import {Image, View, StyleSheet} from "react-native";
import {connect} from 'react-redux';

import Text from '../components/CustomText'
import {DETAIL_ICONS} from "../../resource/ImagePath";

const DETAILS = [
    {name: 'humidity', title: 'Humidity', icon: DETAIL_ICONS.humidity, suffix: '%'},
    {name: 'pressure', title: 'Pressure', icon: DETAIL_ICONS.pressure, suffix: 'hPa'},
    {name: 'visibility', title: 'Visibility', icon: DETAIL_ICONS.visibility, suffix: '%'},
    {name: 'cloudCover', title: 'Cloud Cover', icon: DETAIL_ICONS.cloudCover, suffix: '%'},
    {name: 'ozone', title: 'Ozone', icon: DETAIL_ICONS.ozone, suffix: ''},
    {name: 'uvIndex', title: 'UV Index', icon: DETAIL_ICONS.uvIndex, suffix: ''},
];

function DetailsPanel(props) {
    return (
        <View style={styles.tab}>
            <Text style={styles.mainTitleText}>Details</Text>
            {generateDetailItems(props.currentTimestamp, props.forecast)}
        </View>
    )
}

function generateDetailItems(currentTimestamp, forecast) {
    const currentForecast = getCurrentForecast(currentTimestamp, forecast);
    return DETAILS.map(item => (
        <View
            key={item.name}
            style={styles.detailView}>
            <Image
                style={styles.icon}
                source={item.icon}
            />
            <View style={styles.detailTextView}>
                <Text style={styles.detailTitle}>
                    {item.title}
                </Text>
                <Text style={styles.detailDataText}>
                    {currentForecast[item.name] + item.suffix}
                </Text>
            </View>
        </View>
    ));
}

function getCurrentForecast(currentTimestamp, forecast) {
    for (let dayForecast of forecast) {
        if (dayForecast.timestamp === currentTimestamp)
            return dayForecast;
    }
}

const styles = StyleSheet.create({
    tab: {
        marginTop: 10,
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    mainTitleText: {
        fontSize: 30,
        paddingLeft: '5%',
        color: 'rgb(33,33,33)',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(66,66,66,0.5)'
    },
    detailView: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginTop: 10
    },
    icon: {
        height: 35,
        width: 35
    },
    detailTextView: {
        marginLeft: 15,
        flexDirection: 'column',
        flex: 1,

        //if flexDirection: row -> need those two
        width: '100%',
        justifyContent: 'space-between'
    },
    detailTitle: {
        fontSize: 25
    },
    detailDataText: {
        fontSize: 25,
        color: 'rgba(66,66,66,0.8)'
    }

});

function mapStateToProps(state) {
    return {
        forecast: state.rootForecastPerDay,
        currentTimestamp: state.currentTimestamp,
    };
}

export default connect(mapStateToProps)(DetailsPanel);
