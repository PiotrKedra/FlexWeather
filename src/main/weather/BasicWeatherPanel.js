import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Text from '../components/CustomText';

class BasicWeatherPanel extends React.Component {

    render() {
        return (
            <View style={styles.mainView}>
                <View style={[styles.textView, {borderBottomWidth: 1}]}>
                    <Text style={styles.text}>23 march 2020</Text>
                </View>
                <View style={{flex: 4}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View>
                            {/*todo change actual image size to possible maximum*/}
                            <Image style={{height: 150, width: 150}} source={require('../../../assets/images/snow.png')}/>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 70}}>{this.props.forecastData.temperature}°C</Text>
                            <Text style={{fontSize: 30}}>{this.props.forecastData.temperatureMin}°C/{this.props.forecastData.temperatureMax}°C</Text>
                        </View>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>It is snowing a bit.</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 7
    },
    textView: {
        flex: 1,
        paddingHorizontal: '8%',
    },
    text: {
        fontSize: 30,
        textDecorationLine: 'underline'
    }
});

export default BasicWeatherPanel;
