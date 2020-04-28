import React from "react";
import {Animated, Image, StyleSheet, TouchableOpacity} from "react-native";
import CustomText from "../../components/CustomText";

class MenuListItem extends React.PureComponent {

    state = {
        height: new Animated.Value(30),
        opacity: new Animated.Value(0),
    };

    showOrHideSettings() {
        const visibility = this.props.visibility;
        Animated.timing(this.state.height, {
            toValue: visibility ? 30 : 30 + 30 * this.props.quantityOfSettings,
            duration: 300
        }).start();
        Animated.timing(this.state.opacity, {
            toValue: visibility ? 0 : 1,
            duration: 500
        }).start();
        this.props.setVisibility(!visibility);
    }

    render() {
        const animatedStyle = {
            height: this.state.height,
        };
        const settingsOpacity = {
            opacity: this.state.opacity
        };
        return (
            <Animated.View style={[styles.menuEle, animatedStyle]}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => this.showOrHideSettings()}>
                    <Image style={{height: 30, width: 30}} source={this.props.image}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>{this.props.title}</CustomText>
                </TouchableOpacity>
                {this.props.visibility ?
                    <Animated.View style={settingsOpacity}>
                        {this.props.settingsComponent}
                    </Animated.View>
                    : null
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    menuEle: {
        marginVertical: 7,
        paddingHorizontal: 20
    },
    menuEleText: {
        flexDirection: 'row'
    }
});

export default MenuListItem;
