import React, {Suspense} from 'react';
import {View, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
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
            <View
                style={{
                    marginTop: 10,
                    width: '95%',
                    backgroundColor: '#EEE',
                    borderRadius: 20,
                }}
            >
                <Text style={{fontSize: 30, paddingLeft: '5%', color: 'rgb(33,33,33)', marginTop: 10}}>
                    Hourly forecast
                </Text>
                <ScrollView style={{paddingLeft: '5%', borderBottomWidth: 1, borderColor: 'rgba(66,66,66,0.5)', paddingVertical: 10}}
                            horizontal={true}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}
                                      onPress={() => this.setState({currentChart: 'temperature'})}>
                        <Text style={{fontSize: 20}}>temperature</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}
                                      onPress={() => this.setState({currentChart: 'wind'})}>
                        <Text style={{fontSize: 20}}>wind</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}
                                      onPress={() => this.setState({currentChart: 'rainfall'})}>
                        <Text style={{fontSize: 20}}>rainfall</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}
                                      onPress={() => this.setState({currentChart: 'uv_index'})}>
                        <Text style={{fontSize: 20}}>uv index</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}>
                        <Text style={{fontSize: 20}}>humidity</Text>
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

function mapStateToProps(state) {
    return {
        hourlyForecast: state.hourlyForecast,
    };
}

export default connect(mapStateToProps, {})(HourlyForecastPanel);
