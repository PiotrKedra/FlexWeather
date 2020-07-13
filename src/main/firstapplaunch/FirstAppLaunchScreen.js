import React from 'react';
import {View, TouchableOpacity, Image, PermissionsAndroid, ToastAndroid} from "react-native";
import CustomText from "../components/CustomText";
import GeneralStatusBar from "../components/GeneralStatusBar";
import Geolocation from "@react-native-community/geolocation";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import getLocationDetails from "../location/LocationApi";
import LoadingComponent from "../components/LoadingComponent";


class FirstAppLaunchScreen extends React.PureComponent {

    state = {
        loading: false
    };

    passLocationData(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getLocationDetails(longitude, latitude)
            .then(location => this.props.navigation.replace('AppLauncher', {location: location, themeId: this.props.route.params.themeId, theme: this.props.route.params.theme, saveHomeLocation: true}));
    }

    getLocation(granted) {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
                .then(() => {
                    this.setState({loading: true});
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
            <View style={{flex: 1, backgroundColor: this.props.route.params.theme.mainColor}}>
                <GeneralStatusBar opacity={0}/>
                <View style={{flex: 4, justifyContent: 'center', marginLeft: '10%'}}>
                    <CustomText style={{fontSize: 55, color: '#2c82c9'}}>Forecast?</CustomText>
                    <CustomText style={{fontSize: 55, color: '#2c82c9'}}>Just tell</CustomText>
                    <CustomText style={{fontSize: 55, color: '#2c82c9'}}>us where</CustomText>
                </View>
                <View style={{flex: 6, justifyContent: 'space-around', alignItems: 'center'}}>
                    <Image style={{width: 150, height: 150, tintColor: this.props.route.params.theme.mainText}}
                           source={require('../../../assets/images/first_app_launch_location.png')}
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
                            <CustomText style={{fontSize: 25, color: this.props.route.params.theme.mainColor}}>Current location</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{justifyContent: 'center', alignItems: 'center', padding: 10, width: '80%'}}
                            onPress={() => this.props.navigation.navigate('SearchScreen', {saveHomeLocation: true, themeId: this.props.route.params.themeId, theme: this.props.route.params.theme})}
                        >
                            <CustomText style={{fontSize: 28, color: this.props.route.params.theme.mainText}}>Pick a location</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
                <LoadingComponent loading={this.state.loading}/>
            </View>
        )
    }
}

export default FirstAppLaunchScreen;
