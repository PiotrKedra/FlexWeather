import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground, StatusBar,Image, ScrollView, Animated,FlatList} from 'react-native';
import Text from '../main/components/CustomText';
import Header from './components/Header';
import FooterMenu from './components/FooterMenu'

export default class MainPage extends React.Component {

    state = {
        scroll: false,
        fontLoaded: false,
        days: [{date: 22, short: 'WEN'},{date: 23, short: 'THR'},{date: 24, short: 'FRI'},{date: 25, short: 'SUN'},{date: 26, short: 'SAT'},{date: 27, short: 'MON'}],
        locationOpacity: new Animated.Value(1)
    };

    onScrollNotTopMinimizeHeader = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        if(y >= 5 && this.state.scroll===false){
            Animated.timing(this.state.locationOpacity, {
                toValue: 0,
                duration: 400
            }).start();
            this.setState({scroll: true});
        }
        if(y < 5 && this.state.scroll===true){
            Animated.timing(this.state.locationOpacity, {
                toValue: 1,
                duration: 400
            }).start();
            this.setState({scroll: false});
        }
    };

    render = () => {
        let locationStyle = {
            opacity: this.state.locationOpacity
        };
        return(
            <View style={{flex: 1, backgroundColor: '#aaedaa'}}>
                <View style={{width: '100%', height: StatusBar.currentHeight, backgroundColor: '#FFAD94'}}/>
                <ImageBackground
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#0000'
                    }}
                    source={require('../../assets/images/background.jpg')}
                >
                    <Header isScrool={this.state.scroll}/>
                    <ScrollView contentContainerStyle={{ alignItems: 'center'}} onScroll={this.onScrollNotTopMinimizeHeader} nestedScrollEnabled={true}>
                        <Animated.View style={[styles.locationView, locationStyle]}>
                            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 25}}>Widokowa 22</Text>
                                <Text style={{fontSize: 50}}>Zabierzów</Text>
                            </View>
                        </Animated.View>
                        <FlatList
                            nestedScrollEnabled={true}
                            horizontal={true}
                            style={{paddingLeft: '5%', marginBottom: 10, paddingRight: 100, flex: 1}}
                            data={this.state.days}
                            renderItem={item => (
                                <TouchableOpacity style={{flexGrow: 1, width: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginRight: 8}}>
                                    <Text style={{fontSize: 25}}>{item.item.date}</Text>
                                    <Text style={{fontSize: 22}}>{item.item.short}</Text>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={() => (
                                <TouchableOpacity style={{height: 75, width: 55, marginRight: 8}}>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => JSON.stringify(item.date)}
                        />
                        <View style={{width: '90%', height: 250, backgroundColor: 'white', borderRadius: 20, elevation: 7}}>
                            <View style={{paddingHorizontal: '5%', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  borderBottomWidth: 1}}>
                                <Text style={{fontSize: 30, textDecorationLine: 'underline'}}>23 march 2020</Text>
                            </View>
                            <View style={{flex: 4}}>
                                <View style={{flex: 3, flexDirection: 'row'}}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <Image style={{height: 150, width: 150}} source={require('../../assets/images/snow.png')}/>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{fontSize: 70}}>-3°C</Text>
                                        <Text style={{fontSize: 30}}>-5°C/3°C</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-start', marginLeft: '10%'}}>
                                    <Text style={{fontSize: 30, textDecorationLine: 'underline'}}>It is snowing a bit.</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop: 10, width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>
                        </View>
                        <View style={{marginTop: 10, width: '90%', height: 300, backgroundColor: 'white', borderRadius: 20}}>
                        </View>
                    </ScrollView>
                    <FooterMenu/>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    locationView : {flex: 1, flexDirection: 'row', paddingHorizontal: '5%', marginVertical: 8},
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
