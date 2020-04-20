import React from 'react';
import {Image, StyleSheet, Animated, Dimensions, View, TouchableOpacity as TO} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const HEADER_WIDTH_CLOSE = 75;
const HEADER_WIDTH_OPEN = Dimensions.get('window').width * 0.99;
const HEADER_HEIGHT_CLOSE = 100;
const HEADER_HEIGHT_OPEN = 80;

const HEADER_WIDTH_MENU_OPEN = Dimensions.get('window').width * 0.8;
const HEADER_HEIGHT_MENU_OPEN = Dimensions.get('window').height * 0.8;

class Header extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            width: new Animated.Value(HEADER_WIDTH_CLOSE),
            height: new Animated.Value(HEADER_HEIGHT_CLOSE),
            locationOpacity: new Animated.Value(0),
            menu: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isScroll !== this.props.isScroll){
            this.updateHeader();
        }
    }

    updateHeader() {
        const  isScroll = this.props.isScroll;
        Animated.parallel([
            Animated.timing(this.state.width, {
                toValue: isScroll ? HEADER_WIDTH_OPEN : HEADER_WIDTH_CLOSE,
                duration: 300
            }),
            Animated.timing(this.state.height, {
                toValue: isScroll ? HEADER_HEIGHT_OPEN : HEADER_HEIGHT_CLOSE,
                duration: 300
            }),
            Animated.timing(this.state.locationOpacity, {
                toValue: isScroll ? 1 : 0,
                duration: 400
            })
        ]).start();
    }

    showOrHideMenu(){
        const menu = this.state.menu;
        const isScroll = this.props.isScroll;
        Animated.parallel([
            Animated.timing(this.state.width, {
                toValue: menu ? this.getWidthOnMenuClosing(isScroll) : HEADER_WIDTH_MENU_OPEN,
                duration: 300
            }),
            Animated.timing(this.state.height, {
                toValue: menu ? this.getHeightOnMenuClosing(isScroll) : HEADER_HEIGHT_MENU_OPEN,
                duration: 300
            }),
        ]).start();
        this.setState({menu: !this.state.menu});
    }

    getWidthOnMenuClosing(isScroll) {
        return isScroll ? HEADER_WIDTH_OPEN : HEADER_WIDTH_CLOSE
    }

    getHeightOnMenuClosing(isScroll) {
        return isScroll ? HEADER_HEIGHT_OPEN : HEADER_HEIGHT_CLOSE
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
            <View style={styles.mainView}>
                <TO style={this.state.menu ? styles.outsideTouchableView : null}
                    onPress={()=> this.showOrHideMenu()}/>
                <Animated.View style={[styles.headerOnScroll, animationStyle]}>
                    {!this.state.menu && <View><TouchableOpacity style={styles.burgerMenuOnScroll} onPress={() => this.showOrHideMenu()}>
                        <Image style={{height: 25, width: 25}} source={require('../../../assets/images/menu.png')}/>
                    </TouchableOpacity>
                    {/*<Animated.View style={locationStyle}>*/}
                    {/*    <CustomText style={{fontSize: 30}}>Zabierzów</CustomText>*/}
                    {/*</Animated.View>*/}
                    </View>    }
                    {this.state.menu && <View style={{width: 100, height: 300, backgroundColor: 'red'}}></View>}
                </Animated.View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    outsideTouchableView: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(1,1,1,0.3)'
    },
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
    },
    leftSmallMenu: {
        flexDirection: 'row',
        width: '82%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default Header;
