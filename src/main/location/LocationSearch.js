import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

class LocationSearch extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 4, backgroundColor: '#FFAD94', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 5}}>

                <View style={{width: '100%', height: '100%', backgroundColor: 'white', overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                    <MapView
                        style={{
                            borderTopLeftRadius: 20, borderTopRightRadius: 20,
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
            </View>
        )
    }
}

export default LocationSearch;
