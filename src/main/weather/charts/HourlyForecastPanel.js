import React, {Suspense} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Text from "../../components/CustomText";
import { connect } from 'react-redux';
import ChartLoading from "./utility/ChartLoading";
import AnimatedChartText from "./utility/AnimatedChartText";


class HourlyForecastPanel extends React.PureComponent {

    state = {
        currentChart: 'temperature',
    };

    render() {

        const chartNotSelectedStyle = {backgroundColor: this.props.theme.softColor};
        const mainTextColor = this.props.theme.mainText;
        const ChartView = React.lazy(() => import("./HourlyChartService"));
        return (
            <View style={[styles.mainView, {backgroundColor: this.props.theme.mainColor}]}>
                <Text style={[styles.title, {color: mainTextColor}]}>
                    Hourly forecast
                </Text>
                <Text style={[styles.subtitle, {color: this.props.theme.softText}]}>
                    For next 48 hours
                </Text>
                <ScrollView style={styles.selectionView}
                            horizontal={true}>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='temperature') ? {backgroundColor: this.props.weatherTheme.mainColor} : chartNotSelectedStyle]}
                                      onPress={() => this.setState({currentChart: 'temperature'})}>
                        <AnimatedChartText selected={this.state.currentChart==='temperature'} title={'temperature'} unit={'°C'} textColor={mainTextColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='wind') ? {backgroundColor: this.props.weatherTheme.mainColor} : chartNotSelectedStyle]}
                                      onPress={() => this.setState({currentChart: 'wind'})}>
                        <AnimatedChartText selected={this.state.currentChart==='wind'} title={'wind'} unit={'km/h'} textColor={mainTextColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='rainfall') ? {backgroundColor: this.props.weatherTheme.mainColor} : chartNotSelectedStyle]}
                                      onPress={() => this.setState({currentChart: 'rainfall'})}>
                        <AnimatedChartText selected={this.state.currentChart==='rainfall'} title={'rainfall'} unit={'mm'} textColor={mainTextColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='humidity') ? {backgroundColor: this.props.weatherTheme.mainColor} : chartNotSelectedStyle]}>
                        <AnimatedChartText selected={this.state.currentChart==='humidity'} title={'humidity'} unit={'%'} textColor={mainTextColor}/>
                    </TouchableOpacity>
                </ScrollView>
                <Suspense fallback={<ChartLoading/>}>
                    <ChartView currentChart={this.state.currentChart} hourlyForecast={this.props.hourlyForecast} weatherTheme={this.props.weatherTheme}/>
                </Suspense>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
        width: '95%',
        backgroundColor: '#EEE',
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        paddingLeft: '5%',
        color: 'rgb(33,33,33)',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
        paddingLeft: '5%'
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
    buttonText: {
        fontSize: 20
    },
});

function mapStateToProps(state) {
    return {
        hourlyForecast: state.hourlyForecast,
        weatherTheme: state.weatherTheme,
        theme: state.theme
    };
}

export default connect(mapStateToProps, {})(HourlyForecastPanel);
