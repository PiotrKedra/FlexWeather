import React from 'react';
import {View, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import Text from "../../components/CustomText";
import { connect } from 'react-redux';
import Info from "./common/Info";
import HourlyTemperaturePanel from "./temperature/HourlyTemperaturePanel";
import HourlyRainfallPanel from "./rainfall/HourlyRainfallPanel";
import HourlyUVIndexPanel from "./uvindex/HourlyUVIndexPanel";
import UVIndexLegend from "./uvindex/UVIndexLegend";


class HourlyForecastPanel extends React.PureComponent {

    state = {
        currentChart: 'temperature',
    };

    render() {
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
                                      onPress={() => this.setState({currentChart: 'rainfall'})}>
                        <Text style={{fontSize: 20}}>rainfall</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}
                                      onPress={() => this.setState({currentChart: 'uv_index'})}>
                        <Text style={{fontSize: 20}}>uv index</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}>
                        <Text style={{fontSize: 20}}>pressure</Text>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView horizontal={true}>
                    {(this.state.currentChart === 'temperature') && <HourlyTemperaturePanel hourlyForecast={this.props.hourlyForecast}/>}
                    {(this.state.currentChart === 'rainfall') && <HourlyRainfallPanel hourlyForecast={this.props.hourlyForecast}/>}
                    {(this.state.currentChart === 'uv_index') && <HourlyUVIndexPanel hourlyForecast={this.props.hourlyForecast}/>}
                </ScrollView>
                {(this.state.currentChart === 'uv_index') && <UVIndexLegend/>}

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
