import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomText from './CustomText';

const PoweredBy = ({weatherTheme}) => {
  return (
    <View style={styles.view}>
      <CustomText style={[styles.text, {color: weatherTheme.textColor}]}>
                Powered by OpenWeatherMap
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'flex-start',
    flex: 1,
  },
  text: {
    fontSize: 13,
  },
});

export default PoweredBy;
