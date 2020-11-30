import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';

import CustomText from '../components/CustomText';
import {connect} from 'react-redux';


const MenuLocationComponent = (props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.currentLocationLabel}>
        <Image style={styles.currentLocationImage}
          source={require('../../../assets/images/icons/location.png')}
        />
        <CustomText style={styles.currentLocationLabelText}>
                    Current location
        </CustomText>
      </View>
      <CustomText style={styles.currentLocationText}>
        {props.location.city}, {props.location.country}
      </CustomText>
      <TouchableOpacity style={{
        marginTop: 10,
        paddingHorizontal: 4,
        paddingTop: 3,
        paddingBottom: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(250,250,250,0.4)',
        borderRadius: 20,
        width: '90%',
      }}
      onPress={() => props.navigation.navigate('SearchScreen', {saveHomeLocation: false})}
      >
        <Image
          style={{marginLeft: 5, width: 22, height: 22}}
          source={require('../../../assets/images/icons/search.png')}
        />
        <CustomText style={{fontSize: 18, color: 'rgba(0,0,0,0.35)', marginLeft: 10}}>
                    Find a location
        </CustomText>
      </TouchableOpacity>
    </View>

  );
};

function mapStateToProps(state) {
  return {
    location: state.activeLocation,
  };
}

export default connect(mapStateToProps)(MenuLocationComponent);


const styles = StyleSheet.create({
  mainView: {
    paddingTop: 20,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  currentLocationLabel: {
    flexDirection: 'row',
  },
  currentLocationImage: {
    height: 20,
    width: 20,
  },
  currentLocationLabelText: {
    fontSize: 15,
    marginHorizontal: 7,
  },
  currentLocationText: {
    fontSize: 30,
  },
  locationSearchView: {
    flexDirection: 'row',
    marginTop: 10,

    backgroundColor: 'red',
    padding: 5,
  },
  locationSearchViewInner: {
    backgroundColor: 'rgba(250,250,250,0.4)',
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationSearchViewSearchImage: {
    height: 20,
    width: 20,
    marginLeft: 8,
    marginTop: 1,
    flex: 1,
  },
  locationSearchViewTextInput: {
    fontFamily: 'Neucha-Regular',
    fontSize: 18,
    marginHorizontal: 3,
    paddingVertical: 0,
    flex: 8,
  },
  locationSearchCancelButton: {
    flex: 1,
  },
  locationSearchCancelImage: {
    height: 15,
    width: 15,
  },
});
