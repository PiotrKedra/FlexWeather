import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class FooterMenu extends React.Component{

    render() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <Icon name="donate" size={33}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/global-search.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#FFAD94',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        elevation: 7,
        flexDirection: 'row'
    },
    footerItem: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FooterMenu;
