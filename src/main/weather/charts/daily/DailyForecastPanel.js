import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';

import Text from '../../../components/CustomText'
import DailyGeneralChart from "./svgcharts/DailyGeneralChart";
import {connect} from "react-redux";

class DailyForecastPanel extends React.PureComponent{

    state = {
        currentChart: 'general',
    };

    render() {
        return (
            <View style={[styles.mainView, {backgroundColor: this.props.theme.panelColor}]}>
                <Text style={styles.title}>
                    Today forecast
                </Text>
                <Text style={{fontSize: 18, color: '#777', paddingLeft: '5%'}}>
                    Details
                </Text>
                <View style={{flexDirection: 'row', paddingLeft: '5%', marginVertical: 20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/temperature.png')}/>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize: 20}}>{Math.round(this.props.forecast[0].temp.max)}°/{Math.round(this.props.forecast[0].temp.min)}°</Text>
                            <Text style={{fontSize: 17, color: '#666'}}>temperature</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/sensed-temperature.png')}/>
                        <View style={{paddingLeft: 10, flexShrink: 1}}>
                            <Text style={{fontSize: 20}}>{Math.round(this.props.currentForecast.feels_like)}°</Text>
                            <Text style={{fontSize: 17, color: '#666'}}>sensed temperature</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingLeft: '5%', marginBottom: 20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/rainfall.png')}/>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize: 20}}>{this.props.forecast[0].rain ? this.props.forecast[0].rain : 0} mm</Text>
                            <Text style={{fontSize: 17, color: '#666'}}>rainfall</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/wind-speed.png')}/>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize: 20}}>{this.props.currentForecast.wind_speed} m/s</Text>
                            <Text style={{fontSize: 17, color: '#666'}}>wind speed</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.title}>
                    Daily forecast
                </Text>
                <Text style={{fontSize: 18, color: '#777', paddingLeft: '5%'}}>
                    For next 7 days
                </Text>
                <ScrollView style={styles.selectionView}
                            horizontal={true}>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='general') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'general'})}>
                        <Text style={styles.buttonText}>
                            general
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
                <ScrollView horizontal={true}>
                    <DailyGeneralChart forecast={this.props.forecast} theme={this.props.theme}/>
                </ScrollView>
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
    chartSelected: {
        backgroundColor: 'rgba(200,30,30,0.2)',
    },
    buttonText: {
        fontSize: 20
    },
});

function mapStateToProps(state) {
    return {
        theme: state.theme
    };
}

export default connect(mapStateToProps, {})(DailyForecastPanel);
