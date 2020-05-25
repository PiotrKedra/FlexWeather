import React, {useState} from "react";
import {Image, StyleSheet, TextInput, TouchableOpacity, View, ScrollView} from "react-native";
import CustomText from "../components/CustomText";

const InitLocationSearchComponent = ({loadForecast}) => {

    const [locationInput, changeLocationInput] = useState("");
    const [locations, changeLocations] = useState([]);

    return (
        <View style={styles.mainView}>
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

            <ScrollView style={styles.scrollView}>
                {
                    locations.map(item => (
                        <TouchableOpacity key={item.properties.osm_id}
                                          style={styles.locationItem}
                                          onPress={() => loadForecast(item)}
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

async function searchForLocation(query, changeLocationInput, changeLocations){
    changeLocationInput(query);
    if(query.length >= 3) {
        const locations = await searchForLocationsByQuery(query);
        changeLocations(locations);
    }
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
        marginVertical: 10
    },
    overflowView: {
        overflow: 'hidden',
        paddingBottom: 1
    },
    locationSearchViewInner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        elevation: 1,
    },
    locationSearchViewSearchImage: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 5,
    },
    locationSearchViewTextInput: {
        backgroundColor: 'rgba(1,1,1,0.1)',
        fontFamily: 'Neucha-Regular',
        fontSize: 20,
        marginHorizontal: 3,
        paddingVertical: 0,
        marginVertical: 5,
        flex: 8,
        borderRadius: 3
    },
    locationSearchCancelButton: {
        flex: 1
    },
    locationSearchCancelImage: {
        marginLeft: 5,
        height: 15,
        width: 15,
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
        width: 20,
        height: 20,
        marginHorizontal: 1
    },
    locationItemText: {
        fontSize: 18,
        flex: 9,
        marginHorizontal: 8
    },
});

export default InitLocationSearchComponent;
