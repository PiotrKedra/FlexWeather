import React from 'react';
import { View, ScrollView } from 'react-native';
import BarChart from "./BarChart";

class HourlyTemperaturePanel extends React.Component {

    render() {
        const data = [
            { label: 'Jan', value: 500 },
            { label: 'Feb', value: 312 },
            { label: 'Mar', value: 424 },
            { label: 'Apr', value: 745 },
            { label: 'May', value: 89 },
            { label: 'Jun', value: 434 },
            { label: 'Jul', value: 650 },
            { label: 'Aug', value: 980 },
            { label: 'Sep', value: 123 },
            { label: 'Oct', value: 186 },
            { label: 'Nov', value: 689 },
            { label: 'Dec', value: 643 }
        ]
        return (
            <View style={{flex: 1, borderWidth: 1}}>
                <ScrollView style={{flex: 1, borderWidth: 1}} horizontal={true}>
                    <BarChart data={data} round={100} unit="€"/>
                </ScrollView>
            </View>
        )
    }
}

export default HourlyTemperaturePanel;
