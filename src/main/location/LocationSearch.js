import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {connect} from "react-redux";
import CustomText from "../components/CustomText";
import fetchRootForecast from "../weather/api/ForecastApi";

class LocationSearch extends React.Component {

    state = {
        region: {
            latitude: 50.1102653,
            longitude: 19.7615527,
            latitudeDelta: 0.1844,
            longitudeDelta: 0.0842,
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

    async loadForecastInNewLocation(){
        const location = {
            city: this.state.locationDetails.city,
            country: this.state.locationDetails.country,
            latitude: this.state.coordinate.latitude,
            longitude: this.state.coordinate.longitude,
        };
        const forecast = await fetchRootForecast(this.state.coordinate.latitude, this.state.coordinate.longitude);
        this.props.setForecastInNewLocation(location, forecast);
        this.props.setModalVisible(false);
    }

    render() {
        return (
                <View style={{width: '100%', height: '100%', backgroundColor: 'white', overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 5}}>
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
                        initialRegion={this.state.region}
                    >
                        { this.state.markerVisible && <Marker
                            coordinate={this.state.coordinate}
                            title="title"
                            description="description"/>
                        }
                    </MapView>
                    <TouchableOpacity
                        disabled={!this.state.markerVisible}
                        style={[
                            {position: 'absolute', bottom: 10, right: 10, borderRadius: 10, width: '30%', padding: 3, justifyContent: 'center', alignItems: 'center'},
                            this.state.markerVisible ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(50,50,50,0.8)'}
                        ]}
                        onPress={() => this.loadForecastInNewLocation()}
                    >
                        <CustomText style={{fontSize: 20, color: 'white'}}>Pick</CustomText>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatcherToProps)(LocationSearch);
