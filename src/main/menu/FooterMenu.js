import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Modal} from 'react-native';
import {connect} from 'react-redux';

import CustomText from "../components/CustomText";
import PlacesAutocomplete from "../location/PlacesAutocomplete";


class FooterMenu extends React.Component{
    state = {
        visible: false,
    };

    setModalVisible = (visible) => {
        console.log(visible);
        this.setState({visible: visible});
    };


    render() {
        return (
            <View>
            <Modal
                visible={this.state.visible}
                animationType="slide"
                transparent={true}
            >
                    <TouchableOpacity
                        style={{backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <View style={{backgroundColor: 'white', width: '92%', height: '60%', borderRadius: 20, flexDirection: 'column-reverse'}}>

                            <TouchableOpacity
                                style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderBottomRightRadius: 19, borderBottomLeftRadius: 19, backgroundColor: '#5BC3CE'}}
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}>
                                <CustomText style={{fontSize: 20, color: 'white'}}>Find on map</CustomText>
                            </TouchableOpacity>
                            <View style={{flex: 5}}>
                                <PlacesAutocomplete setModalVisible={this.setModalVisible}/>
                            </View>
                        </View>
                    </TouchableOpacity>
            </Modal>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => {
                    this.setModalVisible(true);
                }}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigation.navigate('LocationSearch')}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/global-search.png')}/>
                </TouchableOpacity>

            </View>
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
