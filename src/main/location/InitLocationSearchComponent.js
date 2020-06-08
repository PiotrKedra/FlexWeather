import React, {useState} from "react";
import {Image, StyleSheet, TextInput, TouchableOpacity, View, ScrollView} from "react-native";
import CustomText from "../components/CustomText";
import {searchForLocationsByQuery} from "./LocationAutocompleteApi";

const InitLocationSearchComponent = ({navigation}) => {

    const [locationInput, changeLocationInput] = useState("");
    const [locations, changeLocations] = useState([]);

    return (
        <View style={{flex: 1, backgroundColor: '#eee'}}>
            <View style={styles.overflowView}>
                <View style={styles.locationSearchViewInner}>
                    <Image
                        style={styles.locationSearchViewSearchImage}
                        source={require('../../../assets/images/icons/search2.png')}
                    />
                    <TextInput
                        style={styles.locationSearchViewTextInput}
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

            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
                {
                    locations.map(item => (
                        <TouchableOpacity key={item.properties.osm_id}
                                          style={styles.locationItem}
                                          onPress={() => navigation.replace('InitLoader', {location: parseLocation(item), saveHomeLocation: false})}
                        >
                            <Image
                                style={styles.locationItemImage}
                                source={require('../../../assets/images/icons/location-marker.png')}
                            />
                            <CustomText style={styles.locationItemText}>
                                {item.properties.name}, {item.properties.country}
                            </CustomText>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
};

function parseLocation(location){
    return {
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1],
        city: location.properties.name,
        country: location.properties.country,
    }
}

async function searchForLocation(query, changeLocationInput, changeLocations){
    changeLocationInput(query);
    if(query.length >= 3) {
        const locations = await searchForLocationsByQuery(query);
        changeLocations(locations);
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

export default InitLocationSearchComponent;
