import React, { Suspense } from 'react';
import {View, ScrollView, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import Text from "../../components/CustomText";
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import TemperatureChart from "./TemperatureChart";


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

        const currentChart = (<TemperatureChart data={this.getProperHourlyForecast(26)}/>);
        const nextFirstChart = (<TemperatureChart data={this.getProperHourlyForecast(27)}/>);
        const nextSecondChart = (<TemperatureChart data={this.getProperHourlyForecast(28)}/>);

        // const LazyLargeComponent = React.lazy(() => {
        //     return new Promise(resolve => setTimeout(resolve, 10)).then(
        //         () => import("./TemperatureChart")
        //     );
        // });

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
                    {currentChart}
                    {nextFirstChart}
                    {nextSecondChart}
                    {/*{ this.checkIfSameDay(26, this.props.currentTimestamp) && currentChart}*/}
                    {/*{ this.checkIfSameDay(27, this.props.currentTimestamp) && nextFirstChart}*/}
                    {/*{ this.checkIfSameDay(28, this.props.currentTimestamp) && nextSecondChart}*/}
                    {/*<Suspense fallback={<View style={{height: 240, width: Dimensions.get('window').width*0.95, justifyContent: 'center', alignItems: 'center'}}><LottieView style={{height: 200}} source={require('../../../../assets/lottie/loading')} autoPlay loop /></View>}>*/}
                    {/*    <LazyLargeComponent data={this.getProperHourlyForecast()} />*/}
                    {/*</Suspense>*/}
                </ScrollView>
            </View>
        )
    }

    getProperHourlyForecast = (day) => {
        let result = [];
        for (let item of this.props.hourlyForecast) {
            if (this.checkIfSameDay(day ,item.timeObject.timestamp)) {
                result.push(item);
            }
        }
        console.log(result);
        return result
    };

    checkIfSameDay(currentTimestamp, timestamp) {
        //let currentDate = new Date(currentTimestamp * 1000);
        let date = new Date(timestamp * 1000);
        return currentTimestamp === date.getDate();
    }
}

function mapStateToProps(state) {
    return {
        hourlyForecast: state.hourlyForecast,
    };
}

export default connect(mapStateToProps, {})(HourlyTemperaturePanel);
