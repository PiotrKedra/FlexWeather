import React from "react";
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Keyboard, Animated } from "react-native";
import searchForLocations from "./LocationAutocompleteApi";
import CustomText from "../components/CustomText";
import {connect} from "react-redux";
import fetchRootForecast from "../weather/api/ForecastApi";
import getThemeEntity from "../theme/ThemeService";


class LocationSearchComponent extends React.Component {

    state = {
        locationInput: '',
        suggestedLocations: [],
        onFocus: false,
        animatedPadding: new Animated.Value(0),
        animatedHeight: new Animated.Value(0),
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
        const theme = getThemeEntity(forecast);
        // need to wait until menu close, because of issue #27
        await new Promise(resolve => setTimeout(resolve, 200));
        this.props.setForecastInNewLocation(location, forecast, theme);
    };

    animate() {
        const onFocus = this.state.onFocus;
        Animated.timing(this.state.animatedPadding, {
            toValue: onFocus ? 0 : 4,
            duration: 200
        }).start();
        Animated.timing(this.state.animatedHeight, {
            toValue: onFocus ? 0 : 200,
            duration: 300
        }).start();
        if(onFocus){
            this.clear()
        }
        this.setState({onFocus: !onFocus});
    }

    onEndEditing(){
        if(this.state.locationInput.length === 0)
            this.setState({onFocus: false})
    }

    clear(){
        Keyboard.dismiss();
        this.setState({
            locationInput: '',
            suggestedLocations: [],
        })
    }

    render() {

        let s1 = {};
        if(this.state.onFocus)
            s1 = {backgroundColor: 'rgba(240,0,0,0.2)', padding: this.state.animatedPadding};
        else
            s1 = {padding: this.state.animatedPadding};
        return (
            <View>
                <Animated.View style={[styles.locationSearchView, s1]}>
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
                            onFocus={() => this.animate()}
                            onEndEditing={() => this.onEndEditing()}
                        />
                        <TouchableOpacity style={styles.locationSearchCancelButton}
                                          onPress={() => this.animate()}>
                            <Image
                                style={styles.locationSearchCancelImage}
                                source={require('../../../assets/images/icons/cancel.png')}
                            />
                        </TouchableOpacity>
                    </View>

                </Animated.View>

                {this.state.onFocus &&
                <Animated.ScrollView style={{backgroundColor: 'rgba(240,0,0,0.2)', width: '100%', height: this.state.animatedHeight}}>
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
                </Animated.ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    locationSearchView: {
        flexDirection: 'row',
        marginTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
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
        setForecastInNewLocation: (location, forecast, theme) => dispatch({ type: 'ROOT_FORECAST', payload: { location: location, forecast: forecast, theme: theme, saveToStorage: true}})
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(LocationSearchComponent);
