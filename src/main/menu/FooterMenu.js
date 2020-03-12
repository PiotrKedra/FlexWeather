import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Modal} from 'react-native';
import {connect} from 'react-redux';


class FooterMenu extends React.Component{
    state = {
        visible: false,
    };

    setModalVisible(visible) {
        console.log(visible);
        this.setState({visible: visible});
    }


    render() {
        return (
            <View>
            <Modal
                visible={this.state.visible}
                animationType="slide"
                transparent={true}
            >
                    <View style={{backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'white', width: '92%', height: '60%', borderRadius: 10}}>
                            <TouchableOpacity
                                style={{borderWidth: 1, padding: 10}}
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
