import React, {Suspense} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Text from "../../components/CustomText";
import { connect } from 'react-redux';
import Info from "./info/Info";
import UvIndexLegend from "./info/UvIndexLegend";
import ChartLoading from "./utility/ChartLoading";


class HourlyForecastPanel extends React.PureComponent {

    state = {
        currentChart: 'temperature',
    };

    render() {
        const ChartView = React.lazy(() => import("./HourlyChartService"));
        return (
            <View style={[styles.mainView, {backgroundColor: this.props.theme.panelColor}]}>
                <Text style={styles.title}>
                    Hourly forecast
                </Text>
                <Text style={{fontSize: 18, color: '#777', paddingLeft: '5%'}}>
                    For next 48 hours
                </Text>
                <ScrollView style={styles.selectionView}
                            horizontal={true}>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='temperature') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'temperature'})}>
                        <Text style={styles.buttonText}>
                            temperature
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='wind') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'wind'})}>
                        <Text style={styles.buttonText}>
                            wind
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='rainfall') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'rainfall'})}>
                        <Text style={styles.buttonText}>
                            rainfall
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='uv_index') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'uv_index'})}>
                        <Text style={styles.buttonText}>
                            uv index
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='humidity') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}>
                        <Text style={styles.buttonText}>
                            humidity
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <Suspense fallback={<ChartLoading/>}>
                    <ChartView currentChart={this.state.currentChart} hourlyForecast={this.props.hourlyForecast}/>
                </Suspense>
                {(this.state.currentChart === 'uv_index') && <UvIndexLegend/>}
                <Info/>
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
    buttonText: {
        fontSize: 20
    },
});

function mapStateToProps(state) {
    return {
        hourlyForecast: state.hourlyForecast,
        theme: state.theme
    };
}

export default connect(mapStateToProps, {})(HourlyForecastPanel);
