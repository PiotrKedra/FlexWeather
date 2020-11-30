import React from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity, View, ScrollView, Dimensions} from 'react-native';
import CustomText from '../components/CustomText';
import {searchForLocationsByQuery} from './LocationAutocompleteApi';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

class SearchScreen extends React.PureComponent {
    state = {
      locationInput: '',
      locations: [],
      homeLocation: {},
      historyLocations: [],
      fetchingTasks: 0,
    }

    async componentDidMount() {
      const homeLocation = await AsyncStorage.getItem('@home_location');
      if (homeLocation) this.setState({homeLocation: JSON.parse(homeLocation)});
      const historyLocations = await AsyncStorage.getItem('@history_locations');
      this.setState({historyLocations: (historyLocations ? JSON.parse(historyLocations) : [])});
    }

    async searchForLocation(query) {
      this.setState({locationInput: query});
      if (query.length >= 3) {
        this.setState({fetchingTasks: this.state.fetchingTasks+1});
        const locations = await searchForLocationsByQuery(query);
        this.setState({locations: locations});
        this.setState({fetchingTasks: this.state.fetchingTasks-1});
      } else {
        this.setState({locations: []});
      }
    }

    renderHistoricalLocations() {
      return (
        <React.Fragment>
          <TouchableOpacity style={{
            padding: 5,
            flexDirection: 'row',
          }}
          onPress={() => this.props.navigation.dispatch(
              CommonActions.reset({
                routes: [{name: 'AppLauncher', params: {location: this.state.homeLocation}}],
                index: 0,
              }),
          )}
          >
            <Image
              style={{width: 25, height: 25, marginHorizontal: 5, marginLeft: 8, tintColor: '#2c82c9'}}
              source={require('../../../assets/images/icons/home.png')}
            />
            <CustomText style={{
              fontSize: 21,
              flex: 9,
              marginHorizontal: 12,
              color: this.props.theme.mainText,
            }}>{this.state.homeLocation.city}, {this.state.homeLocation.country}</CustomText>
          </TouchableOpacity>
          {this.state.historyLocations.map((location) => this.renderLocationItem(location))}
        </React.Fragment>
      );
    }

    renderLocationItem(location, saveToHistory=false) {
      return (
        <TouchableOpacity key={location.latitude + location.longitude}
          style={styles.locationItem}
          onPress={() => {
            this.props.navigation.dispatch(
                CommonActions.reset({routes: [{name: 'AppLauncher', params: {location: location}}], index: 0}),
            );
            if (saveToHistory) this.addToHistory(location);
          }}
        >
          <Image
            style={styles.locationItemImage}
            source={require('../../../assets/images/icons/location-marker.png')}
          />
          <CustomText style={[styles.locationItemText, {color: this.props.theme.mainText}]}>
            {location.city}, {location.country}
          </CustomText>
        </TouchableOpacity>
      );
    }

    renderLocations() {
      if (this.state.fetchingTasks === 0 && this.state.locations.length === 0) {
        return (
          <CustomText style={{marginHorizontal: '5%', fontSize: 25, marginVertical: 5}}>
                    We could not find any location
          </CustomText>
        );
      }
      return this.state.locations.map((location) => this.renderLocationItem(location, true));
    }

    addToHistory(location) {
      const history = this.state.historyLocations;
      history.push(location);
      try {
        AsyncStorage.setItem('@history_locations', JSON.stringify(this.removeDuplicates(history)));
      } catch (e) {
        console.log(e);
      }
    }

    removeDuplicates(array) {
      const result = [];
      for (let i=0; i< array.length; ++i) {
        if (!this.contains(array[i], result)) {
          result.push(array[i]);
        }
      }
      return result;
    }

    contains(ele, array) {
      for (let i=0; i< array.length; ++i) {
        if (array[i].city === ele.city) return true;
      }
      return false;
    }


    render() {
      return (
        <View style={{flex: 1, backgroundColor: this.props.theme.mainColor}}>
          {
            this.state.fetchingTasks !== 0 &&
                    <View style={{position: 'absolute', top: '50%', left: Dimensions.get('window').width / 2 - 42}}>
                      <LottieView style={{height: 80}}
                        source={require('../../../assets/lottie/loading')}
                        autoPlay
                        loop/>
                    </View>
          }
          <View style={styles.overflowView}>
            <View style={styles.locationSearchViewInner}>
              <Image
                style={[styles.locationSearchViewSearchImage, {tintColor: this.props.theme.mainText}]}
                source={require('../../../assets/images/icons/search2.png')}
              />
              <TextInput
                style={[styles.locationSearchViewTextInput, {color: this.props.theme.mainText}]}
                placeholder="Search location"
                onChangeText={(text) => this.searchForLocation(text)}
                value={this.state.locationInput}
                autoFocus={true}
              />
              <TouchableOpacity style={styles.locationSearchCancelButton}
                onPress={() => {
                  this.setState({locationInput: '', locations: []});
                }}
              >
                <Image
                  style={styles.locationSearchCancelImage}
                  source={require('../../../assets/images/icons/cancel.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
            {this.state.locationInput.length <= 3 ?
                        this.renderHistoricalLocations() :
                        this.renderLocations()
            }
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  overflowView: {
    overflow: 'hidden',
    paddingBottom: 1,
  },
  locationSearchViewInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationSearchViewSearchImage: {
    height: 20,
    width: 20,
    marginLeft: '4.5%',
    marginRight: 5,
  },
  locationSearchViewTextInput: {
    backgroundColor: 'rgba(1,1,1,0.1)',
    fontFamily: 'Neucha-Regular',
    fontSize: 25,
    marginHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 10,
    flex: 8,
    borderRadius: 3,
  },
  locationSearchCancelButton: {
    flex: 1,
  },
  locationSearchCancelImage: {
    height: 16,
    width: 16,
    tintColor: '#2c82c9',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  locationItem: {
    padding: 10,
    flexDirection: 'row',
  },
  locationItemImage: {
    width: 28,
    height: 28,
    marginHorizontal: 1,
    tintColor: '#2c82c9',
  },
  locationItemText: {
    fontSize: 21,
    flex: 9,
    marginHorizontal: 14,
  },
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
  };
}

export default connect(mapStateToProps)(SearchScreen);
