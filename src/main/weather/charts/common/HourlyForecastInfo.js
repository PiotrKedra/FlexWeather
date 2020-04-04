import React from 'react';
import {Image, View} from 'react-native';
import Text from '../../../components/CustomText';

class HourlyForecastInfo extends React.PureComponent {

    render() {
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
                    Hourly forecast
                </Text>
                <View style={{paddingHorizontal: '5%', marginBottom: 10, flexDirection: 'row'}}>
                    <Image style={{height: 25, width: 25}} source={require('../../../../../assets/images/info.png')}/>
                    <Text style={{fontSize: 18, color: 'rgba(33,33,33,0.5)', marginHorizontal: 5}}>
                        Our power can predict only hour by hour forecast for the next 48h. We are sorry.
                    </Text>
                </View>

            </View>
        )
    }
}

export default HourlyForecastInfo;
