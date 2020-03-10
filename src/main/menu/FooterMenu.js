import React from 'react'
import {Dimensions , StyleSheet, TouchableOpacity, Image, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import LocationSearch from "../location/LocationSearch";

class FooterMenu extends React.Component{

    state = {
        locationViewHeight: new Animated.Value(50),
        locationViewWidth: new Animated.Value(Math.round(Dimensions.get('window').width/3))
    };

    searchLocation = () => {
        Animated.parallel([
            Animated.timing(this.state.locationViewHeight, {
                toValue: Math.round(Dimensions.get('window').height),
                duration: 400,
            }),
            Animated.timing(this.state.locationViewWidth, {
                toValue: Math.round(Dimensions.get('window').width),
                duration: 400,
            }),
        ]).start()
    };

    render() {
        let locationStyle = {
            height: this.state.locationViewHeight,
            width: this.state.locationViewWidth
        };
        return (
            <Animated.View style={styles.footer}>
                <Animated.View style={[styles.locationSearchOn, locationStyle]}>
                    <LocationSearch/>
                </Animated.View>
                <TouchableOpacity style={styles.footerItem}>
                    <Icon name="donate" size={33}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={this.searchLocation}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/global-search.png')}/>
                </TouchableOpacity>

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        elevation: 7,
        flexDirection: 'row',
    },
    footerItem: {
        backgroundColor: '#FFAD94',
        flex: 1,
        height: 50,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    locationSearchOn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFAD94',
    }
});

export default FooterMenu;
