import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground
} from 'react-native';

import Text from '../../components/CustomText';
import LastUpdateInfo from "./LastUpdateInfo";
import mapDataToImage from "./ArtIconMapper";

const DEGREE_SIGN = '°';

function RootWeatherPanel(props) {
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <Text style={styles.titleDateText}>
                    {parseTimestamp(props.forecast.timestamp)}
                </Text>
                <Text style={styles.titleForecastText}>
                    {props.forecast.summary}
                </Text>
            </View>
            <View style={styles.artView}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={mapDataToImage(props.forecast.icon)}>
                    <View style={styles.temperatureView}>
                        <Text style={styles.mainTemperature}>
                            {props.forecast.temperature + DEGREE_SIGN}
                        </Text>
                        <Text style={styles.minMaxTemperature}>
                            {' | ' + props.forecast.temperatureMin + DEGREE_SIGN + '/' + props.forecast.temperatureMax + DEGREE_SIGN}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.detailView}>
                <Text style={[styles.detailText, styles.bottomSpace]}>
                    There is {props.forecast.precipProbability} chance for rain.
                </Text>
                <Text style={styles.detailText}>
                    Wind has a speed of {props.forecast.windSpeed} and has {props.forecast.windGust} guest.
                </Text>
            </View>
            <LastUpdateInfo/>
        </View>
    );
}

function parseTimestamp(timestamp){
    const date = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()];
}

const styles = StyleSheet.create({
    mainView: {
        width: '95%',
        backgroundColor: 'rgb(244,244,244)',
        borderRadius: 20,
        elevation: 7
    },
    titleView: {
        paddingLeft: '5%',
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(66,66,66,0.5)'
    },
    titleDateText: {
        fontSize: 30,
        color: 'rgb(33,33,33)'
    },
    titleForecastText: {
        fontSize: 24,
        color: 'rgba(33,33,33,0.6)'
    },
    artView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(66,66,66,0.5)',
        height: 200
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0000',
    },
    temperatureView: {
        marginHorizontal: '5%',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    mainTemperature: {
        fontSize: 50,
        color: 'rgb(33,33,33)',
        textShadowColor: 'white',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 1,
            height: 1
        }
    },
    minMaxTemperature: {
        fontSize: 20,
        color: 'rgba(33,33,33,1)',
        marginBottom: 10,
        textShadowColor: 'white',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 1,
            height: 1
        }
    },
    detailView: {
        marginHorizontal: '5%',
        marginVertical: 10
    },
    detailText: {
        fontSize: 20,
        color: 'rgba(33,33,33,1)',
    },
    bottomSpace: {
        marginBottom: 5
    },
});

export default RootWeatherPanel;
