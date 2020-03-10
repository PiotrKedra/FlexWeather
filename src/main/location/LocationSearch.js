import React from 'react';
import {View} from 'react-native';
import MapView from "react-native-maps";

class LocationSearch extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height: 300}}>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    height: 300,
                    width: 300,
                    borderRadius: 8,
                    shadowOpacity: 0.4,
                    elevation: 1.5,
                    marginTop: 5,
                    marginBottom: 5,
                    shadowRadius: 1,
                    shadowOffset: {height: 2, width: 0}
                }}>

                    <MapView
                        style={{
                            borderRadius: 8,
                            height: 300,
                            width: 300,
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
            </View>
        )
    }
}

export default LocationSearch;
