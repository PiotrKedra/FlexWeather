import React from "react";
import {Dimensions, Image, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {getSystemTheme} from "../theme/Theme";
import {searchForLocationsByQuery} from "../location/LocationAutocompleteApi";
import GeneralStatusBar from "../components/GeneralStatusBar";
import CustomText from "../components/CustomText";
import SUGGESTED_LOCATIONS from "../location/SugestedLocations";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from "lottie-react-native";

class ManualLocationScreen extends React.PureComponent {

    state = {
        locationInput: '',
        locations: [],
        fetchingTasks: 0,
        theme: getSystemTheme()
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.mainColor}}>
                <GeneralStatusBar opacity={0}/>
                {
                    this.state.fetchingTasks !== 0
                    &&
                    <View style={{position: 'absolute', top: '50%', left: Dimensions.get('window').width / 2 - 42}}>
                    <LottieView style={{height: 80,}}
                    source={require('../../../assets/lottie/loading')}
                    autoPlay
                    loop/>
                    </View>
                }
                <View style={styles.overflowView}>
                    <View style={styles.locationSearchViewInner}>
                        <Image
                            style={[styles.locationSearchViewSearchImage, {tintColor: this.state.theme.mainText}]}
                            source={require('../../../assets/images/icons/search2.png')}
                        />
                        <TextInput
                            style={[styles.locationSearchViewTextInput, {color: this.state.theme.mainText}]}
                            placeholder="Search location"
                            onChangeText={text => this.searchForLocation(text)}
                            value={this.state.locationInput}
                            autoFocus={true}
                        />
                        <TouchableOpacity style={styles.locationSearchCancelButton}
                                          onPress={() => {this.setState({
                                              locationInput: "",
                                              locations: []
                                          })}}
                        >
                            <Image
                                style={styles.locationSearchCancelImage}
                                source={require('../../../assets/images/icons/cancel.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.locationInput.length < 3 ?
                    <React.Fragment>
                        <CustomText style={{marginHorizontal: '5%', fontSize: 25, marginVertical: 5}}>Some
                            suggestions:</CustomText>
                        {SUGGESTED_LOCATIONS.map(item => this.renderLocationItem(item, this.state.theme.mainText))}
                    </React.Fragment>
                    :
                    this.renderLocationResult()
                }
            </View>
        )
    }

    renderLocationResult(){
        if(this.state.fetchingTasks === 0 && this.state.locations.length === 0)
            return (
                <CustomText style={{marginHorizontal: '5%', fontSize: 25, marginVertical: 5}}>
                    We could not find any location
                </CustomText>
            )
        return this.state.locations
            .map(item => this.renderLocationItem(item, this.state.theme.mainText))
    }

    async searchForLocation(query){
        this.setState({locationInput: query});
        if(query.length >= 3) {
            this.setState({fetchingTasks: this.state.fetchingTasks + 1})
            const locations = await searchForLocationsByQuery(query);
            this.setState({locations: locations});
            this.setState({fetchingTasks: this.state.fetchingTasks - 1})
        } else {
            this.setState({locations: []});
        }
    }

    renderLocationItem(location, color){
        return (
            <TouchableOpacity key={location.latitude + location.longitude}
                              style={styles.locationItem}
                              onPress={() => this.saveLocation(location)}
            >
                <Image
                    style={styles.locationItemImage}
                    source={require('../../../assets/images/icons/location-marker.png')}
                />
                <CustomText style={[styles.locationItemText, {color: color}]}>{location.city}, {location.country}</CustomText>
            </TouchableOpacity>
        )
    }

    saveLocation(location){
        try {
            const stringLocation = JSON.stringify(location);
            AsyncStorage.setItem('@home_location', stringLocation);
            AsyncStorage.setItem('@active_location', stringLocation);
            this.props.navigation.navigate('SetupScreen');
        } catch (e) {
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
        }
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
