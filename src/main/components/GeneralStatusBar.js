import {
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';

const GeneralStatusBar = ({opacity=0.1}) => {
  return (
    <View style={styles.statusBar}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,' + opacity + ')'}/>
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default GeneralStatusBar;
