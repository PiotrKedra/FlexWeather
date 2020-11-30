import {StyleSheet, View} from 'react-native';
import React from 'react';

const CheckBox = ({checked, color}) => {
  return (
    <View style={[styles.checkBoxOut, {borderColor: color}]}>
      {checked ? <View style={[styles.checkBoxIn, {backgroundColor: color}]}/> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxOut: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxIn: {width: 12, height: 12, borderRadius: 12},
});

export default CheckBox;
