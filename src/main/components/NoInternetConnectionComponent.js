import React from 'react';
import CustomText from './CustomText';
import {Animated, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

class NoInternetConnectionComponent extends React.Component {
    state = {
      animatedPosition: new Animated.Value(-30),
    };

    componentDidMount() {
      NetInfo.addEventListener((state) => {
        Animated.timing(this.state.animatedPosition, {
          toValue: state.isConnected ? -30 : 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }

    render() {
      return (
        <Animated.View style={[styles.noInternetConnectionView, {bottom: this.state.animatedPosition}]}>
          <CustomText style={styles.noInternetConnectionText}>
                    no internet connection ...
          </CustomText>
        </Animated.View>
      );
    }
}

const styles = StyleSheet.create({
  noInternetConnectionView: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 30,
    backgroundColor: '#CC2A30',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  noInternetConnectionText: {
    fontSize: 20,
    color: '#eee',
  },
});

export default NoInternetConnectionComponent;
