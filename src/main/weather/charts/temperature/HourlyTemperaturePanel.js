import React from 'react';
import {View, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import Text from "../../../components/CustomText";
import { connect } from 'react-redux';
import TemperatureChart from "./TemperatureChart";
import Info from "../common/Info";


class HourlyTemperaturePanel extends React.Component {

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
                <FlatList
                    style={{paddingLeft: '5%', borderBottomWidth: 1, borderColor: 'rgba(66,66,66,0.5)', paddingVertical: 10}}
                    horizontal={true}
                    data={[{value: 'temperature'}, {value: 'rainfall'}, {value: 'wind'}, {value: 'pressure'}]}
                    renderItem={(item) => (
                        <TouchableOpacity style={{backgroundColor: 'rgba(240,240,240,1)', borderRadius: 15, elevation: 1, justifyContent: 'center', alignContent: 'center', marginRight: 20, paddingHorizontal: 15, paddingVertical: 5}}>
                            <Text style={{fontSize: 20}}>{item.item.value}</Text>
                        </TouchableOpacity>)}
                    keyExtractor={(item)=> (item.value)}
                />
                <ScrollView horizontal={true}>
                    {this.generateChartComponentsForNext48H(this.props.hourlyForecast)}
                </ScrollView>
                <Info/>
            </View>
        )
    }

    generateChartComponentsForNext48H(hourlyForecast) {
        let currentDate = new Date(hourlyForecast[0].timeObject.timestamp * 1000).getDate();
        let hourlyForecastByDailyDate = [];
        let tmpArray = [];
        hourlyForecast.forEach(item => {
            if ( currentDate === new Date(item.timeObject.timestamp * 1000).getDate()) {
                tmpArray.push(item);
            } else {
                let tmpItem = Object.assign({}, item);
                tmpItem.time = '23:59';
                tmpArray.push(tmpItem);
                hourlyForecastByDailyDate.push(tmpArray);
                currentDate = new Date(item.timeObject.timestamp * 1000).getDate();
                tmpArray = [item];
            }
        });
        hourlyForecastByDailyDate.push(tmpArray);
        let index=0;
        return hourlyForecastByDailyDate.map(hourlyForecastPerDay => {
            let key = 'k' + index;
            index = index + 1;
            return (<TemperatureChart key={key} data={hourlyForecastPerDay}/>)
        })
    }
}

function mapStateToProps(state) {
    return {
        hourlyForecast: state.hourlyForecast,
    };
}

export default connect(mapStateToProps, {})(HourlyTemperaturePanel);
