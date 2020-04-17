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
            <View style={styles.mainView}>
                <Text style={styles.title}>
                    Hourly forecast
                </Text>
                <ScrollView style={styles.selectionView}
                            horizontal={true}>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='temperature') ? styles.chartSelected : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'temperature'})}>
                        <Text style={styles.buttonText}>
                            temperature
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='wind') ? styles.chartSelected : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'wind'})}>
                        <Text style={styles.buttonText}>
                            wind
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='rainfall') ? styles.chartSelected : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'rainfall'})}>
                        <Text style={styles.buttonText}>
                            rainfall
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='uv_index') ? styles.chartSelected : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'uv_index'})}>
                        <Text style={styles.buttonText}>
                            uv index
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='humidity') ? styles.chartSelected : styles.chartNotSelected]}>
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
        hourlyForecast: state.hourlyForecast,
    };
}

export default connect(mapStateToProps, {})(HourlyForecastPanel);
