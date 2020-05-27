import React from "react";
import {Animated, Dimensions, View} from "react-native";
import CustomText from "../components/CustomText";
import InitLocationSearchComponent from "./InitLocationSearchComponent";

const WINDOW_WIDTH = Dimensions.get('window').width;

class AnimatedInitLocationSearchComponent extends React.Component{

    state = {
        animatedPosition: new Animated.Value(WINDOW_WIDTH)
    };

    componentDidMount() {
        this.animate();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.isSearchLocationWindow !== this.props.isSearchLocationWindow){
            this.animate();
        }
    }

    animate() {
        Animated.timing(this.state.animatedPosition, {
            toValue: this.props.isSearchLocationWindow ? 0 : WINDOW_WIDTH,
            duration: 300
        }).start();
    }

    render() {
        return (
            <Animated.View style={{position: 'absolute', top: 0, left: this.state.animatedPosition, width: '100%', height: '100%', backgroundColor: 'white', paddingTop: 20}}>
                <CustomText style={{fontSize: 25, marginHorizontal: 10, marginTop: 20}}>Tell us your location</CustomText>
                <InitLocationSearchComponent loadForecast={this.props.loadForecastFromSearchComponent}/>
            </Animated.View>
        )
    }

}

export default AnimatedInitLocationSearchComponent;
