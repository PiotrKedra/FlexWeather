import React from 'react';
import {Image, View} from "react-native";
import { connect } from 'react-redux';
import Text from '../components/CustomText'

class SummaryPanel extends React.Component {

    render() {
        const currentForecast = this.getCurrentForecast();
        console.log(currentForecast);
        return (
            <View
                style={{
                    marginTop: 10,
                    width: '95%',
                    backgroundColor: 'white',
                    borderRadius: 20,
                }}
            >
                <Text style={{fontSize: 30, paddingLeft: '5%', color: 'rgb(33,33,33)', marginVertical: 10, borderBottomWidth: 1, borderColor: 'rgba(66,66,66,0.5)'}}>
                    Summary
                </Text>

                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '5%', marginTop: 10}}>
                    <Image
                        style={{height: 35, width: 35}}
                        source={require('../../../assets/images/details/humidity.png')}
                    />
                    <View style={{marginLeft: 15, flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 25}}>Humidity</Text>
                        <Text
                            style={{fontSize: 25, color: 'rgba(66,66,66,0.8)'}}>{currentForecast.humidity}%</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '5%', marginTop: 10}}>
                    <Image
                        style={{height: 35, width: 35}}
                        source={require('../../../assets/images/details/pressure.png')}
                    />
                    <View style={{marginLeft: 15, flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 25}}>Pressure</Text>
                        <Text
                            style={{fontSize: 25, color: 'rgba(66,66,66,0.8)'}}>{currentForecast.pressure}hPa</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '5%', marginTop: 10}}>
                    <Image
                        style={{height: 35, width: 35}}
                        source={require('../../../assets/images/details/visibility.png')}
                    />
                    <View style={{marginLeft: 15, flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 25}}>Visibility</Text>
                        <Text
                            style={{fontSize: 25, color: 'rgba(66,66,66,0.8)'}}>{currentForecast.visibility}%</Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '5%', marginTop: 10}}>
                    <Image
                        style={{height: 35, width: 35}}
                        source={require('../../../assets/images/details/cloud-cover.png')}
                    />
                    <View style={{marginLeft: 15, flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 25}}>Cloud cover</Text>
                        <Text
                            style={{fontSize: 25, color: 'rgba(66,66,66,0.8)'}}>{currentForecast.cloudCover}%</Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '5%', marginTop: 10}}>
                    <Image
                        style={{height: 35, width: 35}}
                        source={require('../../../assets/images/details/ozone.png')}
                    />
                    <View style={{marginLeft: 15, flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 25}}>Ozone</Text>
                        <Text
                            style={{fontSize: 25, color: 'rgba(66,66,66,0.8)'}}>{currentForecast.ozone}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: '5%', marginTop: 10}}>
                    <Image
                        style={{height: 35, width: 35}}
                        source={require('../../../assets/images/details/uv-index.png')}
                    />
                    <View style={{marginLeft: 15, flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 25}}>UV index</Text>
                        <Text
                            style={{fontSize: 25, color: 'rgba(66,66,66,0.8)'}}>{currentForecast.uvIndex}</Text>
                    </View>
                </View>

            </View>
        )
    }

    getCurrentForecast = () => {
        for (let dayForecast of this.props.forecast) {
            if (dayForecast.timestamp === this.props.currentTimestamp)
                return dayForecast;
        }
    }
}

function mapStateToProps(state) {
    console.log("CURRENT_TIMESTAMP");
    console.log(state.currentTimestamp);
    return {
        forecast: state.rootForecastPerDay,
        currentTimestamp: state.currentTimestamp,
    };
}

export default connect(mapStateToProps)(SummaryPanel);
