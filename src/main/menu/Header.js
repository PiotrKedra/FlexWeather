import React from 'react';
import {Image, StyleSheet, Animated, Dimensions, View} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import CustomText from "../components/CustomText";

const HEADER_WIDTH_CLOSE = 75;
const HEADER_WIDTH_OPEN = Dimensions.get('window').width * 0.99;
const HEADER_HEIGHT_CLOSE = 100;
const HEADER_HEIGHT_OPEN = 80;

class Header extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            width: new Animated.Value(HEADER_WIDTH_CLOSE),
            height: new Animated.Value(HEADER_HEIGHT_CLOSE),
            locationOpacity: new Animated.Value(0),
            menu: false
        }
    }

    showMenu(){
        if(this.state.menu === false) {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: Dimensions.get('window').width * 0.8,
                    duration: 300
                }),
                Animated.timing(this.state.height, {
                    toValue: Dimensions.get('window').height * 0.8,
                    duration: 300
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: HEADER_WIDTH_CLOSE,
                    duration: 300
                }),
                Animated.timing(this.state.height, {
                    toValue: HEADER_HEIGHT_CLOSE,
                    duration: 300
                }),
            ]).start();
        }
        this.setState({menu: !this.state.menu});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isScrool !== this.props.isScrool){
            this.updateHeader();
        }
    }

    updateHeader() {
        this.setState({menu: false});
        if(this.props.isScrool === false) {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: HEADER_WIDTH_CLOSE,
                    duration: 300
                }),
                Animated.timing(this.state.height, {
                    toValue: HEADER_HEIGHT_CLOSE,
                    duration: 300
                }),
                Animated.timing(this.state.locationOpacity, {
                    toValue: 0,
                    duration: 400
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: HEADER_WIDTH_OPEN,
                    duration: 500
                }),
                Animated.timing(this.state.height, {
                    toValue: HEADER_HEIGHT_OPEN,
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
                {!this.state.menu && <View><TouchableOpacity style={styles.burgerMenuOnScroll} onPress={() => this.showMenu()}>
                    <Image style={{height: 25, width: 25}} source={require('../../../assets/images/menu.png')}/>
                </TouchableOpacity>
                {/*<Animated.View style={locationStyle}>*/}
                {/*    <CustomText style={{fontSize: 30}}>Zabierzów</CustomText>*/}
                {/*</Animated.View>*/}
                </View>    }
                {this.state.menu && <View style={{width: 100, height: 300, backgroundColor: 'red'}}></View>}
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
        paddingTop: 20,
    },
    burgerMenuOnScroll:{
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    leftSmallMenu: {
        flexDirection: 'row',
        width: '82%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default Header;
