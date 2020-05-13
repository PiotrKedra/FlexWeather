import React from "react";
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import searchForLocations from "./LocationAutocompleteApi";
import CustomText from "../components/CustomText";
import {connect} from "react-redux";
import fetchRootForecast from "../weather/api/ForecastApi";


class LocationSearchComponent extends React.Component {

    state = {
        locationInput: '',
        suggestedLocations: []
    };

    async searchForLocation(query, lon, lat){
        this.setState({locationInput: query});
        if(query.length >= 3) {
            const locations = await searchForLocations(query, lat, lon);
            this.setState({suggestedLocations: locations});
        }
    }

     setActiveLocation = async (item) =>{
        this.props.closeMenu();

        const location = {
            city: item.properties.name,
            country: item.properties.country,
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
        };
        const forecast = await fetchRootForecast(location.latitude, location.longitude);

        // need to wait until menu close, because of issue #27
        await new Promise(resolve => setTimeout(resolve, 200));
        this.props.setForecastInNewLocation(location, forecast);
    };

    render() {
        return (
            <View>
                <View style={styles.locationSearchView}>
                    <View style={styles.locationSearchViewInner}>
                        <Image
                            style={styles.locationSearchViewSearchImage}
                            source={require('../../../assets/images/icons/search.png')}
                        />
                        <TextInput
                            style={styles.locationSearchViewTextInput}
                            placeholder="Search location"
                            onChangeText={text => this.searchForLocation(text, 50.1102653, 19.7615527)}
                            value={this.state.locationInput}
                        />
                        <TouchableOpacity style={styles.locationSearchCancelButton}
                                          onPress={() => this.setState({locationInput: ''})}>
                            <Image
                                style={styles.locationSearchCancelImage}
                                source={require('../../../assets/images/icons/cancel.png')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                {this.state.locationInput.length >= 3 &&
                <ScrollView style={{backgroundColor: 'rgba(240,0,0,0.2)', width: '100%', height: 200}}>
                    {
                        this.state.suggestedLocations.map(item => (
                            <TouchableOpacity key={item.properties.osm_id}
                                              style={{padding: 5, flexDirection: 'row', borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)'}}
                                              onPress={() => this.setActiveLocation(item)}
                            >
                                <Image
                                    style={{width: 20, height: 20, marginHorizontal: 5, flex: 1}}
                                    source={require('../../../assets/images/icons/location-marker.png')}
                                />
                                <CustomText style={{fontSize: 18, flex: 9, marginHorizontal: 3}}>{item.properties.name}, {item.properties.country}</CustomText>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        paddingTop: 20,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    currentLocationLabel: {
        flexDirection: 'row'
    },
    currentLocationImage: {
        height: 20,
        width: 20
    },
    currentLocationLabelText: {
        fontSize: 15,
        marginHorizontal: 7
    },
    currentLocationText: {
        fontSize: 30
    },
    locationSearchView: {
        flexDirection: 'row',
        marginTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'rgba(240,0,0,0.2)',
        padding: 5,
    },
    locationSearchViewInner: {
        backgroundColor: 'rgba(250,250,250,0.4)',
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationSearchViewSearchImage: {
        height: 20,
        width: 20,
        marginLeft: 8,
        marginTop: 1,
        flex: 1
    },
    locationSearchViewTextInput: {
        fontFamily: 'Neucha-Regular',
        fontSize: 18,
        marginHorizontal: 3,
        paddingVertical: 0,
        flex: 8
    },
    locationSearchCancelButton: {
        flex: 1
    },
    locationSearchCancelImage: {
        height: 15,
        width: 15
    },
});

function mapStateToProps(state){
    return {}
}

function mapDispatcherToProps(dispatch) {
    return {
        setForecastInNewLocation: (location, forecast) => dispatch({ type: 'ROOT_FORECAST', payload: { location: location, forecast: forecast}})
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(LocationSearchComponent);
