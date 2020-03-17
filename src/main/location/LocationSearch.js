import React from 'react';
import {View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class LocationSearch extends React.Component {

    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        coordinate: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
        locationDetails: {},
        markerVisible: false
    };

    async getLocationDetails(coordinate){
        const url = 'http://photon.komoot.de/reverse?lon=' + coordinate.longitude + '&lat=' + coordinate.latitude + '&lang=en';
        const response = await fetch(url);
        const locationDetails = await response.json();
        const location = {
            city: locationDetails.features[0].properties.city,
            country: locationDetails.features[0].properties.country,
        };
        this.setState({
            markerVisible: true,
            coordinate: coordinate,
            locationDetails: location
        })
    }

    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 4, backgroundColor: '#FFAD94', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 5}}>

                <View style={{width: '100%', height: '100%', backgroundColor: 'white', overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                    <MapView
                        onPress={({nativeEvent}) => {
                            this.getLocationDetails(nativeEvent.coordinate);
                        }}
                        style={{
                            borderTopLeftRadius: 20, borderTopRightRadius: 20,
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
                    >
                        { this.state.markerVisible && <Marker
                            coordinate={this.state.coordinate}
                            title="title"
                            description="description"
                        />}

                    </MapView>
                </View>
            </View>
        )
    }
}

export default LocationSearch;
