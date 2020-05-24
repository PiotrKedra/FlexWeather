import React, {useState} from "react";
import {Animated, Image, StyleSheet, TextInput, TouchableOpacity, View, ScrollView} from "react-native";
import searchForLocations, {searchForLocationsByQuery} from "./LocationAutocompleteApi";
import CustomText from "../components/CustomText";

function animate() {

}

function onEndEditing(){

}

async function searchForLocation(query, changeLocationInput, changeLocations){
    changeLocationInput(query);
    if(query.length >= 3) {
        const locations = await searchForLocationsByQuery(query);
        changeLocations(locations);
    }
}

const InitLocationSearchComponent = () => {

    const [locationInput, changeLocationInput] = useState("");
    const [locations, changeLocations] = useState([]);

    return (
        <View style={{marginTop: 10, marginVertical: 10}}>
            <View style={styles.locationSearchViewInner}>
                <Image
                    style={styles.locationSearchViewSearchImage}
                    source={require('../../../assets/images/icons/search.png')}
                />
                <TextInput
                    style={styles.locationSearchViewTextInput}
                    placeholder="Search location"
                    onChangeText={text => searchForLocation(text, changeLocationInput, changeLocations)}
                    value={locationInput}
                    onFocus={() => animate()}
                    onEndEditing={() => onEndEditing()}
                />
                <TouchableOpacity style={styles.locationSearchCancelButton}
                                  onPress={() => animate()}>
                    <Image
                        style={styles.locationSearchCancelImage}
                        source={require('../../../assets/images/icons/cancel.png')}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={{width: '100%', height: '100%'}}>
                {
                    locations.map(item => (
                        <TouchableOpacity key={item.properties.osm_id}
                                          style={{padding: 10, flexDirection: 'row'}}
                                          onPress={() => console.log(item)}
                        >
                            <Image
                                style={{width: 20, height: 20, marginHorizontal: 5, flex: 1}}
                                source={require('../../../assets/images/icons/location-marker.png')}
                            />
                            <CustomText style={{fontSize: 18, flex: 9, marginHorizontal: 3}}>{item.properties.name}, {item.properties.country}</CustomText>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    locationSearchView: {
        flexDirection: 'row',
        marginTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    mainView: {
        paddingTop: 20,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    currentLocationLabel: {
        flexDirection: 'row'
    },
    currentLocationImage: {
        height: 20,
        width: 20
    },
    currentLocationLabelText: {
        fontSize: 15,
        marginHorizontal: 7
    },
    currentLocationText: {
        fontSize: 30
    },
    locationSearchViewInner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    locationSearchViewSearchImage: {
        height: 30,
        width: 30,
        marginLeft: 8,
        flex: 1
    },
    locationSearchViewTextInput: {
        backgroundColor: 'red',
        fontFamily: 'Neucha-Regular',
        fontSize: 20,
        marginHorizontal: 3,
        paddingVertical: 0,
        flex: 8,
        borderRadius: 3
    },
    locationSearchCancelButton: {
        flex: 1
    },
    locationSearchCancelImage: {
        height: 15,
        width: 15
    },
});

export default InitLocationSearchComponent;
