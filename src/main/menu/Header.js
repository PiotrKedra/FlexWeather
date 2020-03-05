import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Animated} from "react-native";

import CustomText from "../components/CustomText";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: new Animated.Value(75),
            height: new Animated.Value(90),
            locationOpacity: new Animated.Value(0)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isScrool !== this.props.isScrool){
            this.updateHeader();
        }
    }

    updateHeader() {
        if(this.props.isScrool === false) {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: 75,
                    duration: 400
                }),
                Animated.timing(this.state.height, {
                    toValue: 90,
                    duration: 400
                }),
                Animated.timing(this.state.locationOpacity, {
                    toValue: 0,
                    duration: 400
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: 355,
                    duration: 700
                }),
                Animated.timing(this.state.height, {
                    toValue: 70,
                    duration: 400
                }),
                Animated.timing(this.state.locationOpacity, {
                    toValue: 1,
                    duration: 1000
                })
            ]).start();
        }
    }


    render() {
        let animationStyle = {
            width: this.state.width,
            height: this.state.height,
        };
        let locationStyle = {
            opacity: this.state.locationOpacity
        };
        return (
            <Animated.View style={[styles.headerOnScroll, animationStyle]}>
                <TouchableOpacity style={styles.burgerMenuOnScroll}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/menu.png')}/>
                </TouchableOpacity>
                <Animated.View style={locationStyle}>
                    <CustomText style={{fontSize: 30}}>Zabierzów</CustomText>
                </Animated.View>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        width: '99%',
    },
    headerOnScroll: {
        flexDirection: 'row',
        backgroundColor: '#FFAD94',
        borderBottomLeftRadius: 25,
        alignItems: 'center',
        elevation: 7,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    burgerMenuOnScroll:{
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftSmallMenu: {
        flexDirection: 'row',
        width: '82%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default Header;
