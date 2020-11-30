import React from 'react';
import {Dimensions, Animated} from 'react-native';
import LottieView from 'lottie-react-native';

class LoadingComponent extends React.PureComponent {
    state = {
      animatedTopPosition: new Animated.Value(-50),
    };

    componentDidMount() {
      this.animate();
    }

    componentDidUpdate() {
      this.animate();
    }

    animate() {
      Animated.timing(this.state.animatedTopPosition, {
        toValue: this.props.loading ? 125 : -50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    render() {
      return (
        <Animated.View style={{
          backgroundColor: '#999',
          width: 30,
          height: 30,
          borderRadius: 15,
          position: 'absolute',
          top: this.state.animatedTopPosition,
          right: Dimensions.get('window').width/2 - 15,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        >
          <LottieView
            style={{height: 40}}
            source={require('../../../assets/lottie/loading')}
            autoPlay
            loop/>
        </Animated.View>
      );
    }
}

export default LoadingComponent;
