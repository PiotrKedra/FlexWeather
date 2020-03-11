import React from 'react';
import {View} from 'react-native';
import MapView from "react-native-maps";

import FooterMenu from "../menu/FooterMenu";

class LocationSearch extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginTop: 10, width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}}>
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
