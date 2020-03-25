import React from 'react';
import {View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import TemperatureChart from "./TemperatureChart";
import Text from "../../components/CustomText";


class HourlyTemperaturePanel extends React.Component {

    render() {
        const tmpData = [
            {label: '8:00', temp: 5, rain: '1%'},
            {label: '9:00', temp: 5, rain: '0%'},
            {label: '10:00', temp: 6, rain: '2%'},
            {label: '11:00', temp: 8, rain: '2%'},
            {label: '12:00', temp: 9, rain: '3%'},
            {label: '13:00', temp: 9, rain: '0%'},
            {label: '14:00', temp: 10, rain: '11%'},
            {label: '15:00', temp: 8, rain: '20%'},
            {label: '16:00', temp: 7, rain: '69%'},
            {label: '17:00', temp: 6, rain: '0%'},
            {label: '18:00', temp: 4, rain: '0%'},
        ];
        return (
            <View
                style={{
                    marginTop: 10,
                    width: '95%',
                    backgroundColor: 'white',
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
                    <TemperatureChart data={tmpData} />
                </ScrollView>
            </View>
        )
    }
}

export default HourlyTemperaturePanel;
