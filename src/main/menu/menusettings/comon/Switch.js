import React from "react";
import {Animated, TouchableOpacity, StyleSheet} from "react-native";
import CustomText from "../../../components/CustomText";

class Switch extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            leftPosition: new Animated.Value(props.isEnabled ? 31 : 0),
            leftBorderRadius: new Animated.Value(props.isEnabled ? 0 : 15),
            rightBorderRadius: new Animated.Value(props.isEnabled ? 15 : 0),
        };
    }

    changeSwitch() {
        Animated.parallel([
            Animated.timing(this.state.leftPosition, {
                toValue: this.props.isEnabled ? 0 : 31,
                duration: 300
            }),
            Animated.timing(this.state.leftBorderRadius, {
                toValue: this.props.isEnabled ? 15 : 0,
                duration: 300
            }),
            Animated.timing(this.state.rightBorderRadius, {
                toValue: this.props.isEnabled ? 0 : 15,
                duration: 300
            })
        ]).start();
        this.props.setIsEnabled(!this.props.isEnabled);
    }

    render() {
        const animationStyle = {
            backgroundColor: this.props.isEnabled ? 'rgba(250,30,3,0.4)' : 'rgba(33,33,33,0.4)',
            left: this.state.leftPosition,
            borderTopLeftRadius: this.state.leftBorderRadius,
            borderBottomLeftRadius: this.state.leftBorderRadius,
            borderTopRightRadius: this.state.rightBorderRadius,
            borderBottomRightRadius: this.state.rightBorderRadius,
        };
        return (
            <TouchableOpacity style={styles.button}
                              onPress={() => this.changeSwitch()}>
                <CustomText style={styles.buttonText}>off</CustomText>
                <CustomText style={styles.buttonText}>on</CustomText>
                <Animated.View style={[styles.animatedView, animationStyle]}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 2,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#FFE4DC',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 3
    },
    animatedView: {
        position: 'absolute',
        top: 0,
        width: '50%',
        height: '100%'
    }
});

export default Switch;
