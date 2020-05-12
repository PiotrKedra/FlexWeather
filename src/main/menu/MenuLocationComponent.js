import React from "react";
import {Image, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";

import CustomText from "../components/CustomText";
import searchForLocations from "../location/LocationAutocompleteApi";

async function searchForLocation(query, lon, lat, changeText){
    changeText(query);
    if(query.length >= 3) {
        console.log( await searchForLocations(query, lat, lon));
    }
}

const MenuLocationComponent = () => {
    const [value, changeText] = React.useState('');
    return (
        <View style={styles.mainView}>
            <View style={styles.currentLocationLabel}>
                <Image style={styles.currentLocationImage}
                       source={require('../../../assets/images/icons/location.png')}
                />
                <CustomText style={styles.currentLocationLabelText}>
                    Current location
                </CustomText>
            </View>
            <CustomText style={styles.currentLocationText}>
                Zabierzów, Poland
            </CustomText>
            <View style={styles.locationSearchView}>
                <View style={styles.locationSearchViewInner}>
                    <Image
                        style={styles.locationSearchViewSearchImage}
                        source={require('../../../assets/images/icons/search.png')}
                    />
                    <TextInput
                        style={styles.locationSearchViewTextInput}
                        placeholder="Search location"
                        onChangeText={text => searchForLocation(text, 50.1102653, 19.7615527, changeText)}
                        value={value}
                    />
                    <TouchableOpacity style={styles.locationSearchCancelButton}>
                        <Image
                            style={styles.locationSearchCancelImage}
                            source={require('../../../assets/images/icons/cancel.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
};

export default MenuLocationComponent;


const styles = StyleSheet.create({
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
    locationSearchView: {
        flexDirection: 'row',
        marginTop: 10,
    },
    locationSearchViewInner: {
        backgroundColor: 'rgba(250,250,250,0.4)',
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationSearchViewSearchImage: {
        height: 20,
        width: 20,
        marginLeft: 8,
        marginTop: 1,
        flex: 1
    },
    locationSearchViewTextInput: {
        fontFamily: 'Neucha-Regular',
        fontSize: 18,
        marginHorizontal: 3,
        paddingVertical: 0,
        flex: 8
    },
    locationSearchCancelButton: {
        flex: 1
    },
    locationSearchCancelImage: {
        height: 15,
        width: 15
    },
});
