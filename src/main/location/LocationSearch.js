import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import FooterMenu from "../menu/FooterMenu";
import PlacesAutocomplete from "./PlacesAutocomplete";

class LocationSearch extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#FFAD94'}}>

                <View style={{width: '100%', height: '100%', backgroundColor: 'white', overflow: 'hidden'}}>
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
                            latitudeDelta: 0.1844,
                            longitudeDelta: 0.0842,
                        }}
                    />
                </View>
                <PlacesAutocomplete/>

                <FooterMenu/>
            </View>
        )
    }
}

export default LocationSearch;
