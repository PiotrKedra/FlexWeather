import {PermissionsAndroid, ToastAndroid} from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from "@react-native-community/async-storage";

const getLocation = async () => {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))
        return await getCurrentLocation();
    return getStorageLocation();
}

async function getCurrentLocation() {
    try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000});
        const coords = await getCurrentCoords();
        const locationDetails = await getLocationDetails(coords.longitude, coords.latitude);
        return {
            longitude: coords.longitude,
            latitude: coords.latitude,
            ...locationDetails
        }
    } catch (e){
        return getStorageLocation();
    }
}

const getCurrentCoords = () => {
    return new Promise((resolve, reject) =>
        Geolocation.getCurrentPosition(
            ({coords}) => resolve(coords),
            reject,
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000})
    );
}

const getLocationDetails = async (longitude, latitude) => {
    const url = 'http://photon.komoot.de/reverse?lon=' + longitude + '&lat=' + latitude + '&lang=en';
    try {
        const response = await fetch(url);
        const locationDetails = await response.json();
        return {
            city: locationDetails.features[0].properties.city,
            country: locationDetails.features[0].properties.country,
        };
    } catch (e){
        ToastAndroid.show('Couldn\'t get location details', ToastAndroid.SHORT);
        return {
            city: 'undefined',
            country: 'undefined',
        }
    }

};

function getStorageLocation() {
    try {
        return AsyncStorage.getItem('@active_location');
    } catch (e){
        return AsyncStorage.getItem('@home_location');
    }
}

export default getLocation;
