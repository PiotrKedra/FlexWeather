import React, {Suspense} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Image, Text} from 'react-native';

import CustomText from '../../../components/CustomText'
import {connect} from "react-redux";
import ChartLoading from "../utility/ChartLoading";
import AnimatedChartText from "../utility/AnimatedChartText";
import DailyChartService from "./DailyChartService";

class DailyForecastPanel extends React.PureComponent{

    state = {
        currentChart: 'general',
    };

    render() {
        return (
            <View style={[styles.mainView, {backgroundColor: this.props.theme.panelColor}]}>
                <CustomText style={styles.title}>
                    Today forecast
                </CustomText>
                <CustomText style={{fontSize: 18, color: '#777', paddingLeft: '5%'}}>
                    Details
                </CustomText>
                <View style={{flexDirection: 'row', paddingLeft: '5%', marginVertical: 20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/temperature.png')}/>
                        <View style={{paddingLeft: 10}}>
                            <CustomText style={{fontSize: 20}}>{Math.round(this.props.forecast[0].temp.max)}°/{Math.round(this.props.forecast[0].temp.min)}°</CustomText>
                            <CustomText style={{fontSize: 17, color: '#666'}}>temperature</CustomText>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/sensed-temperature.png')}/>
                        <View style={{paddingLeft: 10, flexShrink: 1}}>
                            <CustomText style={{fontSize: 20}}>{Math.round(this.props.currentForecast.feels_like)}°</CustomText>
                            <Text style={{fontFamily: 'Neucha-Regular', fontSize: 17, color: '#666'}}>sensed temperature</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingLeft: '5%', marginBottom: 20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/rainfall.png')}/>
                        <View style={{paddingLeft: 10}}>
                            <CustomText style={{fontSize: 20}}>{this.props.forecast[0].rain ? this.props.forecast[0].rain : 0} mm</CustomText>
                            <CustomText style={{fontSize: 17, color: '#666'}}>rainfall</CustomText>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={{width: 45, height: 45}} source={require('../../../../../assets/images/details/wind-speed.png')}/>
                        <View style={{paddingLeft: 10}}>
                            <CustomText style={{fontSize: 20}}>{Math.round(this.props.currentForecast.wind_speed*36)/10} km/h</CustomText>
                            <CustomText style={{fontSize: 17, color: '#666'}}>wind speed</CustomText>
                        </View>
                    </View>
                </View>
                <CustomText style={styles.title}>
                    Daily forecast
                </CustomText>
                <CustomText style={{fontSize: 18, color: '#777', paddingLeft: '5%'}}>
                    For next 7 days
                </CustomText>
                <ScrollView style={styles.selectionView}
                            horizontal={true}>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='general') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'general'})}>

                        <AnimatedChartText selected={this.state.currentChart==='general'} title={'general'} unit={'°C'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='wind') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'wind'})}>
                        <AnimatedChartText selected={this.state.currentChart==='wind'} title={'wind'} unit={'km/h'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='rainfall') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected]}
                                      onPress={() => this.setState({currentChart: 'rainfall'})}>
                        <AnimatedChartText selected={this.state.currentChart==='rainfall'} title={'rainfall'} unit={'mm'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chartSelectionButton, (this.state.currentChart==='uv_index') ? {backgroundColor: this.props.theme.mainColor} : styles.chartNotSelected, {marginRight: 30}]}
                                      onPress={() => this.setState({currentChart: 'uv_index'})}>
                        <CustomText style={styles.buttonText}>
                            uv index
                        </CustomText>
                    </TouchableOpacity>
                </ScrollView>
                <Suspense fallback={<ChartLoading/>}>
                    <DailyChartService currentChart={this.state.currentChart} forecast={this.props.forecast} theme={this.props.theme}/>
                </Suspense>

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
