import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground, StatusBar,Image, Text, ScrollView} from 'react-native';


export default class MainPage extends React.Component {

    state = {
        scroll: false,
        days: [{date: 22, short: 'wen'},{date: 23, short: 'thr'},{date: 24, short: 'fri'},{date: 25, short: 'sun'},{date: 26, short: 'sat'},{date: 27, short: 'mon'},{date: 28, short: 'thu'}]
    };

    onScrollNotTopMinimizeHeader = (event) => {
        console.log(event);

        const y = event.nativeEvent.contentOffset.y;
        if(y > 0 && this.state.scroll===false){
            this.setState({scroll: true});
        }
        if(y === 0 && this.state.scroll===true){
            this.setState({scroll: false});
        }
    };

    render = () => {
        return(
            <View style={{flex: 1, backgroundColor: '#aaedaa'}}>
                <StatusBar hidden />
                <ImageBackground
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#0000'
                    }}
                    source={require('../../assets/images/background.jpg')}
                >
                    <View style={!this.state.scroll ?  styles.headerBar : styles.headerBarOnScroll}>
                        <View style={styles.upView}>
                            <View style={!this.state.scroll ? styles.header : styles.headerOnScroll}>
                                <TouchableOpacity style={!this.state.scroll ? styles.burgerMenu : styles.burgerMenuOnScroll} onPress={() => this.setState({scroll: !this.state.scroll})}>
                                    <Image style={{height: 33, width: 33}} source={require('../../assets/images/menu.png')}/>
                                </TouchableOpacity>
                                <View style={styles.leftSmallMenu}>
                                    <TouchableOpacity>
                                        <Image style={{height: 38, width: 38, marginRight: 10}} source={require('../../assets/images/global-search.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={{height: 38, width: 38, marginRight: 10}} source={require('../../assets/images/pin.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
                            <View style={{width: '60%'}}>
                                <Text style={{fontSize: 20}}>Widokowa 22</Text>
                                <Text style={{fontSize: 40}}>Zabierzów</Text>
                            </View>
                            <View style={{width: '40%', alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Image style={{height: 60, width: 60}}
                                       source={require('../../assets/images/snowin.png')}/>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={{width: '100%'}} onScroll={this.onScrollNotTopMinimizeHeader}>
                        <View style={{margin: '5%', marginTop: 0, width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>

                        </View>
                        <View style={{margin: '5%', marginTop: 0,width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>

                        </View>
                        <View style={{margin: '5%', marginTop: 0,width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerBar: {
        height: '28%',
    },
    headerBarOnScroll:{
        height: '11%',
    },
    upView: {
        flexDirection: 'column',
    },
    header:{
        flexDirection: 'row',
        width: '99%',
    },
    headerOnScroll: {
        flexDirection: 'row',
        width: '99%',
        backgroundColor: '#FFAD94',
        borderBottomRightRadius: 25,
        elevation: 7,
    },
    burgerMenu: {
        width: '18%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFAD94',
        borderBottomRightRadius: 25,
        elevation: 7,
    },
    burgerMenuOnScroll:{
        width: '18%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftSmallMenu: {
        flexDirection: 'row',
        width: '82%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rightMenu:{
        borderWidth: 1,
        width: '80%',
        padding: 10,
        paddingRight: 0,
    }
});
