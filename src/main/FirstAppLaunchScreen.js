import React from 'react';
import {View, TouchableOpacity, Image, PermissionsAndroid, ToastAndroid} from "react-native";
import CustomText from "./components/CustomText";
import GeneralStatusBar from "./components/GeneralStatusBar";
import Geolocation from "@react-native-community/geolocation";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import getLocationDetails from "./location/LocationApi";


class FirstAppLaunchScreen extends React.PureComponent {

    passLocationData(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getLocationDetails(longitude, latitude)
            .then(location => this.props.navigation.replace('InitLoader', {location: location, saveHomeLocation: true}));
    }

    getLocation(granted) {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
                .then(() => {
                    Geolocation.getCurrentPosition(
                        (position) => this.passLocationData(position),
                        () => ToastAndroid.show('Could\'n get your location', ToastAndroid.SHORT),
                        {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000}
                    );})
                .catch(() => {
                    ToastAndroid.show('You need to enable location.', ToastAndroid.SHORT)
                });
        } else {
            ToastAndroid.show('Need location to load forecast', ToastAndroid.SHORT)
        }
    }

    async askForPermission() {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => this.getLocation(granted))
            .catch(() => ToastAndroid.show('Could\'n get your location', ToastAndroid.SHORT));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <GeneralStatusBar opacity={0.1}/>
                <View style={{flex: 4, justifyContent: 'center', marginLeft: '10%'}}>
                    <CustomText style={{fontSize: 55, color: '#2c82c9'}}>Forecast?</CustomText>
                    <CustomText style={{fontSize: 55, color: '#2c82c9'}}>Just tell</CustomText>
                    <CustomText style={{fontSize: 55, color: '#2c82c9'}}>us where</CustomText>
                </View>
                <View style={{flex: 6, justifyContent: 'space-around', alignItems: 'center'}}>
                    <Image style={{width: 150, height: 150}}
                           source={require('../../assets/images/first_app_launch_location.png')}
                    />
                    <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <TouchableOpacity style={{
                            backgroundColor: '#2c82c9',
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            width: '80%'
                        }}
                                          onPress={() => this.askForPermission()}
                        >
                            <CustomText style={{fontSize: 25, color: '#ddd'}}>Current location</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{justifyContent: 'center', alignItems: 'center', padding: 10, width: '80%'}}
                            onPress={() => this.props.navigation.navigate('SearchScreen')}
                        >
                            <CustomText style={{fontSize: 28, color: '#222'}}>Pick a location</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default FirstAppLaunchScreen;
