import React, {Suspense} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Image, Text} from 'react-native';

import CustomText from '../../components/CustomText'
import {connect} from "react-redux";
import ChartLoading from "../charts/utility/ChartLoading";
import AnimatedChartText from "../charts/utility/AnimatedChartText";
import DailyChartService from "../charts/daily/DailyChartService";
import MainDetailsPanel from "./maindetails/MainDetailsPanel";
import DailyChartForecastPanel from "../charts/daily/DailyChartForecastPanel";

class DailyForecastPanel extends React.PureComponent{
    render() {
        return (
            <View style={[styles.mainView, {backgroundColor: this.props.theme.mainColor}]}>
                <MainDetailsPanel/>
                <DailyChartForecastPanel/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
        width: '95%',
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        paddingLeft: '5%',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
        paddingLeft: '5%'
    },
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
    selectionView: {
        paddingLeft: '5%',
        borderBottomWidth: 1,
        borderColor: 'rgba(66,66,66,0.5)',
        paddingVertical: 10,
    },
    chartSelectionButton: {
        borderRadius: 15,
        elevation: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        opacity: 0.8
    },
    chartNotSelected: {
        backgroundColor: 'rgba(240,240,240,1)',
    },
    chartSelected: {
        backgroundColor: 'rgba(200,30,30,0.2)',
    },
    buttonText: {
        fontSize: 20
    },
});

function mapStateToProps(state) {
    return {
        currentForecast: state.currentForecast,
        dailyForecast: state.rootForecastPerDay,
        weatherTheme: state.weatherTheme,
        theme: state.theme
    };
}

export default connect(mapStateToProps, {})(DailyForecastPanel);
