import React from "react";
import {Image, PermissionsAndroid, Pressable, ToastAndroid, View} from "react-native";
import GeneralStatusBar from "../components/GeneralStatusBar";
import CustomText from "../components/CustomText";
import {getSystemTheme} from "../theme/Theme";

const SetupLocationScreen = ({navigation}) => {

    const theme = getSystemTheme();

    return (
        <View style={{backgroundColor: theme.mainColor, flex: 1}}>
            <GeneralStatusBar opacity={0}/>
            <View style={{flex: 2, justifyContent: 'center', marginLeft: '10%', paddingBottom: 20, marginTop: 20}}>
                <CustomText style={{fontSize: 40, color: theme.mainText}}>Need your location</CustomText>
                <CustomText style={{fontSize: 20, color: theme.softText}}>Allow us to get it or search for it.</CustomText>
            </View>
            <View style={{flex: 6, justifyContent: 'space-around', alignItems: 'center'}}>
                <Image style={{width: 150, height: 150, tintColor: theme.mainText}}
                       source={require('../../../assets/images/first_app_launch_location.png')}
                />
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Pressable style={{
                        backgroundColor: '#2c82c9',
                        borderRadius: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        width: '80%'
                    }}
                                      onPress={() => askForPermission(navigation)}
                    >
                        <CustomText style={{fontSize: 25, color: theme.mainColor}}>current location</CustomText>
                    </Pressable>
                    <Pressable
                        style={{justifyContent: 'center', alignItems: 'center', padding: 10, width: '80%'}}
                        onPress={() => navigation.navigate('CurrentLocationScreen')}
                    >
                        <CustomText style={{fontSize: 28, color: theme.mainText}}>pick a location</CustomText>
                    </Pressable>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <CustomText style={{fontSize: 17, color: '#777'}}>2/3</CustomText>
            </View>
        </View>
    )
};

function askForPermission(navigation) {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(() => navigation.navigate('CurrentLocationScreen'))
        .catch(() => ToastAndroid.show('Need to access your location', ToastAndroid.SHORT));
}

export default SetupLocationScreen;
