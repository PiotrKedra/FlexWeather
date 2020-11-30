import React from 'react';
import {Animated, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

class LauncherLoadingComponent extends React.PureComponent {
    state = {
      animatedOpacity: new Animated.Value(0),
      finalOpacity: 0.6,
      duration: 1500,
    };

    componentDidMount() {
      this.animate();
    }

    componentDidUpdate() {
      this.animate();
    }

    animate() {
      Animated.timing(this.state.animatedOpacity, {
        toValue: this.state.finalOpacity,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }

    render() {
      return (
        <Animated.View style={{
          position: 'absolute',
          top: '50%',
          right: Dimensions.get('window').width/2 - 40,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: this.state.animatedOpacity,
        }}
        >
          <LottieView
            style={{height: 80}}
            source={require('../../../assets/lottie/launcher-loading')}
            autoPlay
            loop/>
        </Animated.View>
      );
    }
}

export default LauncherLoadingComponent;
