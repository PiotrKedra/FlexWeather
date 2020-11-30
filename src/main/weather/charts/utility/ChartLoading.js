import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';
import CustomText from '../../../components/CustomText';

function ChartLoading() {
  return (
    <View style={styles.view}>
      <LottieView
        style={styles.lottie}
        source={require('../../../../../assets/lottie/loading')}
        autoPlay
        loop/>
      <CustomText>Loading...</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: 200,
  },
});

export default ChartLoading;
