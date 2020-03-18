import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Modal} from 'react-native';
import {connect} from 'react-redux';

import CustomText from "../components/CustomText";
import PlacesAutocomplete from "../location/PlacesAutocomplete";
import LocationSearch from "../location/LocationSearch";
import fetchRootForecast from "../weather/api/ForecastApi";


class FooterMenu extends React.Component{
    state = {
        visible: false,
        mapVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({visible: visible});
    };


    changeMapVisible = () => {
        if(this.state.mapVisible){
            this.setState({mapVisible: false});
        } else {
            this.setState({mapVisible: true});
        }
    };

    render() {
        return (
            <View>
            <Modal
                visible={this.state.visible}
                animationType="slide"
                transparent={true}
            >
                    <View
                        style={{backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <View style={{backgroundColor: 'white', width: '92%', height: '60%', borderRadius: 20}}>
                            <View style={{flex: 4}}>

                                { !this.state.mapVisible ?
                                    <PlacesAutocomplete setModalVisible={this.setModalVisible}/>
                                :
                                    <LocationSearch setModalVisible={this.setModalVisible}/>
                                }
                            </View>


                            <View style={{flex: 2, justifyContent: 'center'}}>
                                <TouchableOpacity
                                    style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: '4%', borderRadius: 10, borderWidth: 3, borderColor: '#5BC3CE', backgroundColor: '#5BC3CE', marginBottom: 10}}
                                    onPress={this.changeMapVisible}>
                                    <CustomText style={{fontSize: 20, color: 'white'}}>{ !this.state.mapVisible ? 'Find on map' : 'Find by writing' }</CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(false);
                                    }}
                                    style={{flex: 1,backgroundColor: 'white', borderWidth: 3, borderColor: '#FF6F6F',borderBottomRightRadius: 19, marginHorizontal: '4%', marginBottom: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                                    <CustomText style={{fontSize: 20, color: '#FF6F6F'}}>Close</CustomText>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
            </Modal>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={{height: 33, width: 33}} source={require('../../../assets/images/pin.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
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
