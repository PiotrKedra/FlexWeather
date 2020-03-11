import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import FooterMenu from "../menu/FooterMenu";

class LocationSearch extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#FFAD94'}}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2}
                    autoFocus={true}
                    returnKeyType={'search'}
                    listViewDisplayed={false}
                    fetchDetails={true}
                    query={{
                        key: 'YOUR_API_KEY',
                        language: 'en'
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={200}
                />
                <View style={{marginTop: 10, width: '95%', height: 300, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden'}}>
                    <MapView
                        style={{
                            borderRadius: 8,
                            height: '100%',
                            width: '100%',
                            shadowOffset: {width: 16.4, height: 1.6}
                        }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
                <FooterMenu/>
            </View>
        )
    }
}

export default LocationSearch;
