import React from 'react';
import { StyleSheet } from 'react-native';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

import {GOOGLE_TOKEN} from "../token";

class PlacesAutocomplete extends React.Component {

    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={3} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}

                getDefaultValue={() => ''}

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
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        )
    }
}

export default PlacesAutocomplete;


const styles = StyleSheet.create({
    textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderBottomWidth: 0,
        paddingHorizontal: '5%'
    },
    container: {
        position: 'absolute',
        top: '5%',
        left: 0,
        width: '100%',
        height: '50%',
    },
    description: {
        fontWeight: 'bold'
    },
    predefinedPlacesDescription: {
        color: '#1faadb'
    }
});
