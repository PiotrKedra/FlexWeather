import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground, StatusBar,Image, ScrollView, Animated,FlatList} from 'react-native';
import Text from '../main/components/CustomText';
import Header from './menu/Header';
import FooterMenu from './menu/FooterMenu';
import BasicWeatherPanel from './weather/BasicWeatherPanel';
import DayPickerList from './components/DayPickerList';
import TOKEN from "./token";

export default class MainPage extends React.Component {

    state = {
        scroll: false,
        fontLoaded: false,
        days: [],
        locationOpacity: new Animated.Value(1),
        forecast: {}
    };

    constructor(props){
        super(props);
        this.loadDataWeather();
    }

    async loadDataWeather() {
        try {
            let response = await fetch('https://api.darksky.net/forecast/' + TOKEN + '/50.1102653,19.7615527');
            let responseJson = await response.json();
            this.setState({forecast: responseJson});

            let dayForecastArray = responseJson.daily.data;
            let days = this.getDateObjectsList(dayForecastArray);
            this.setState({days: days})
        } catch (error) {
            console.log(error);
        }
    };

    getDateObjectsList(dayForecastArray){
        let days = [];
        for (let dayForecast of dayForecastArray){
            let dateObject = this.convertUnixTime(dayForecast.time);
            days.push(dateObject);
        }
        return days;
    }

    convertUnixTime(unixTimestamp){
        let date = new Date(unixTimestamp * 1000);
        let days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
        return {
            unixTimestamp: unixTimestamp,
            date: date.getDate(),
            day: days[date.getDay()]
        }
    }

    onScrollNotTopMinimizeHeader = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        if(y >= 5 && this.state.scroll===false){
            Animated.timing(this.state.locationOpacity, {
                toValue: 0,
                duration: 400
            }).start();
            this.setState({scroll: true});
        }
        if(y < 5 && this.state.scroll===true){
            Animated.timing(this.state.locationOpacity, {
                toValue: 1,
                duration: 400
            }).start();
            this.setState({scroll: false});
        }
    };

    render = () => {
        let locationStyle = {
            opacity: this.state.locationOpacity
        };
        return(
            <View style={{flex: 1}}>
                <View style={styles.statusBarCover}/>
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../assets/images/background.jpg')}
                >
                    <Header isScrool={this.state.scroll}/>
                    <ScrollView
                        contentContainerStyle={{alignItems: 'center'}}
                        onScroll={this.onScrollNotTopMinimizeHeader}
                        nestedScrollEnabled={true}
                    >
                        <Animated.View style={[styles.locationView, locationStyle]}>
                            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 25}}>Widokowa 22</Text>
                                <Text style={{fontSize: 50}}>Zabierzów</Text>
                            </View>
                        </Animated.View>
                        <DayPickerList days={this.state.days}/>
                        <BasicWeatherPanel/>

                        {/*todo to change*/}
                        <View style={{marginTop: 10, width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>
                        </View>
                        <View style={{marginTop: 10, width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>
                        </View>

                    </ScrollView>
                    <FooterMenu/>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    statusBarCover: {width: '100%',
        height: StatusBar.currentHeight,
        backgroundColor: '#FFAD94'
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0000'
    },
    locationView : {flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        marginVertical: 8
    },
});
