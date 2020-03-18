import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import * as Font from "expo-font";
import {connect} from "react-redux";

import {GOOGLE_TOKEN} from "../token";
import CustomText from "../components/CustomText";
import fetchRootForecast from "../weather/api/ForecastApi";

class PlacesAutocomplete extends React.Component {

    async componentDidMount() {
        await Font.loadAsync({
            'Neucha': require('../../../assets/fonts/Neucha-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    async setActiveLocation(data, details){
        const location = {
            city: data.structured_formatting.main_text,
            country: data.structured_formatting.secondary_text,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        };
        const forecast = await fetchRootForecast(location.latitude, location.longitude);
        this.props.setForecastInNewLocation(location, forecast);
        this.props.setModalVisible(false);
    };

    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => this.setActiveLocation(data, details)}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: GOOGLE_TOKEN,
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}
                styles={styles}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    type: 'cafe'
                }}
                GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderRightButton={() => <TouchableOpacity
                    onPress={this.clearInputText}
                    style={{height: '100%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}><CustomText style={{fontSize: 18}}>Cancel</CustomText></TouchableOpacity>}
            />
        )
    }
}

function mapStateToProps(state){
    return {}
}

function mapDispatcherToProps(dispatch) {
    return {
        setForecastInNewLocation: (location, forecast) => dispatch({ type: 'FORECAST_IN_NEW_LOCATION', payload: { location: location, forecast: forecast}})
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(PlacesAutocomplete);


const styles = StyleSheet.create({
    textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    textInput: {
        backgroundColor: '#FFD7CB',
        elevation: 7,
        color: 'black',
        fontFamily: 'Neucha',
        fontSize: 25,
        height: 45
    },
    container: {
        width: '100%',
    },
    predefinedPlacesDescription: {
        color: '#1faadb'
    },
    poweredContainer: {
        height: 0
    },
    listView: {
    },
    row: {
        height: 50,
    },
    description: {
        fontFamily: 'Neucha',
        fontSize: 20
    },
});
