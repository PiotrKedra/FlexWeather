import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';

class FooterMenu extends React.Component{

    render() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigation.navigate('LocationSearch')}>
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
        flexDirection: 'row',
    },
    footerItem: {
        flex: 1,
        height: 50,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
});

function mapStateToProps(state){
    return {
        navigation: state.navigation
    }
}
export default connect(mapStateToProps)(FooterMenu);
