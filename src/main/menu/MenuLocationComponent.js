import React from "react";
import {Image, TextInput, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native";

import CustomText from "../components/CustomText";
import searchForLocations from "../location/LocationAutocompleteApi";
import LocationSearchComponent from "../location/LocationSearchComponent";



const MenuLocationComponent = (props) => {
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
            <LocationSearchComponent closeMenu={props.closeMenu}/>
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

        backgroundColor: 'red',
        padding: 5,
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
