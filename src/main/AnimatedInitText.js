import React from 'react';
import {Animated, Dimensions} from 'react-native';
import CustomText from "./components/CustomText";

class AnimatedInitText extends React.PureComponent{

    state = {
        initTextLeftPosition: new Animated.Value(-300)
    };

    componentDidMount() {
        Animated.timing(this.state.initTextLeftPosition, {
            toValue: 0,
            duration: 300,
        }).start();
    }

    render() {
        return (
            <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: this.state.initTextLeftPosition, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width}}>
                {/*<CustomText style={{fontSize: 50, color: '#fff'}}>Cool Weather</CustomText>*/}
            </Animated.View>
        )
    }

}

export default AnimatedInitText;
