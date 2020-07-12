import React from 'react';
import CustomText from "../../../components/CustomText";
import {Animated} from "react-native";

class AnimatedChartText extends React.PureComponent{

    state = {
        initWidth: this.props.title.length*10,
        extraWidth: this.props.unit.length*15,
        animatedWidth: new Animated.Value(this.props.selected ? this.props.title.length*10 +this.props.unit.length*10: this.props.title.length*10)
    };

    componentDidUpdate(prevProps, prevState) {
        Animated.timing(this.state.animatedWidth, {
            toValue: this.props.selected ? this.state.initWidth + this.state.extraWidth: this.state.initWidth,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    render(){
        const textColor = this.props.selected ? '#000' : this.props.textColor;
        return (
            <Animated.View style={{width: this.state.animatedWidth, flexDirection: 'row', justifyContent: 'center'}}>
                <CustomText style={{fontSize: 20, textAlign: 'left', color: textColor}}>
                    {this.props.title}
                </CustomText>
                {this.props.selected && <CustomText style={{fontSize: 20, color: textColor}}>
                    {this.props.selected && (' / (' + this.props.unit + ')')}
                </CustomText>}
            </Animated.View>
        )
    }
}

export default AnimatedChartText;
