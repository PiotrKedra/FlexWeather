import React, {useState} from "react";
import {Image, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {getSystemTheme} from "../theme/Theme";
import {searchForLocationsByQuery} from "../location/LocationAutocompleteApi";
import GeneralStatusBar from "../components/GeneralStatusBar";
import CustomText from "../components/CustomText";
import SUGGESTED_LOCATIONS from "../location/SugestedLocations";
import AsyncStorage from "@react-native-community/async-storage";


const ManualLocationScreen = ({navigation}) => {

    const theme = getSystemTheme();
    const [locationInput, changeLocationInput] = useState("");
    const [locations, changeLocations] = useState([]);

    return (
        <View style={{flex: 1, backgroundColor: theme.mainColor}}>
            <GeneralStatusBar opacity={0}/>
            <View style={styles.overflowView}>
                <View style={styles.locationSearchViewInner}>
                    <Image
                        style={[styles.locationSearchViewSearchImage, {tintColor: theme.mainText}]}
                        source={require('../../../assets/images/icons/search2.png')}
                    />
                    <TextInput
                        style={[styles.locationSearchViewTextInput, {color: theme.mainText}]}
                        placeholder="Search location"
                        onChangeText={text => searchForLocation(text, changeLocationInput, changeLocations)}
                        value={locationInput}
                        autoFocus={true}
                    />
                    <TouchableOpacity style={styles.locationSearchCancelButton}
                                      onPress={() => {changeLocationInput(""); changeLocations([])}}
                    >
                        <Image
                            style={styles.locationSearchCancelImage}
                            source={require('../../../assets/images/icons/cancel.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {locationInput.length < 3 ?
                <React.Fragment>
                    <CustomText style={{marginHorizontal: '5%', fontSize: 25, marginVertical: 5}}>Some suggestions:</CustomText>
                    {SUGGESTED_LOCATIONS.map(item => renderLocationItem(item, navigation, theme.mainText))}
                </React.Fragment>
                :
                locations.map(item => renderLocationItem(item, navigation, theme.mainText))
            }

        </View>
    )
};

async function searchForLocation(query, changeLocationInput, changeLocations){
    changeLocationInput(query);
    if(query.length >= 3) {
        const locations = await searchForLocationsByQuery(query);
        locations.forEach((ele, i) => locations[i] = parseLocation(ele));
        changeLocations(locations);
    }
}

function parseLocation(location){
    return {
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1],
        city: location.properties.name,
        country: location.properties.country,
    }
}

function renderLocationItem(location, navigation, color){
    return (
        <TouchableOpacity key={location.latitude + location.longitude}
                          style={styles.locationItem}
                          onPress={() => saveLocation(location, navigation)}
        >
            <Image
                style={styles.locationItemImage}
                source={require('../../../assets/images/icons/location-marker.png')}
            />
            <CustomText style={[styles.locationItemText, {color: color}]}>{location.city}, {location.country}</CustomText>
        </TouchableOpacity>
    )
}

function saveLocation(location, navigation){
    try {
        const stringLocation = JSON.stringify(location);
        AsyncStorage.setItem('@home_location', stringLocation);
        AsyncStorage.setItem('@active_location', stringLocation);
        navigation.navigate('SetupScreen');
    } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
    }
}

const styles = StyleSheet.create({
    overflowView: {
        overflow: 'hidden',
        paddingBottom: 1
    },
    locationSearchViewInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationSearchViewSearchImage: {
        height: 20,
        width: 20,
        marginLeft: '4.5%',
        marginRight: 5,
    },
    locationSearchViewTextInput: {
        backgroundColor: 'rgba(1,1,1,0.1)',
        fontFamily: 'Neucha-Regular',
        fontSize: 25,
        marginHorizontal: 10,
        paddingVertical: 0,
        marginVertical: 10,
        flex: 8,
        borderRadius: 3
    },
    locationSearchCancelButton: {
        flex: 1
    },
    locationSearchCancelImage: {
        height: 16,
        width: 16,
        tintColor: '#2c82c9'
    },
    scrollView: {
        width: '100%',
        height: '100%'
    },
    locationItem: {
        padding: 10,
        flexDirection: 'row'
    },
    locationItemImage: {
        width: 28,
        height: 28,
        marginHorizontal: 1,
        tintColor: '#2c82c9'
    },
    locationItemText: {
        fontSize: 21,
        flex: 9,
        marginHorizontal: 14
    },
});

export default ManualLocationScreen;
