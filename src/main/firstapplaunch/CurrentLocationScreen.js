import React from "react";
import {Pressable, ToastAndroid, View, Dimensions, StyleSheet, Animated} from "react-native";
import CustomText from "../components/CustomText";
import {getSystemTheme} from "../theme/Theme";
import GeneralStatusBar from "../components/GeneralStatusBar";
import LottieView from "lottie-react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Geolocation from "@react-native-community/geolocation";
import getLocationDetails from "../location/LocationApi";
import AsyncStorage from "@react-native-community/async-storage";

class CurrentLocationScreen extends React.PureComponent{

    state ={
        theme: getSystemTheme(),
        location: {},
        searchingLeftPosition: new Animated.Value(0),
        resultLeftPosition: new Animated.Value(WINDOW_WIDTH),
    };

    componentDidMount() {
        this.findLocation();
    }

    findLocation() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(() => {
                Geolocation.getCurrentPosition(
                    (position) => this.showLocation(position),
                    () => ToastAndroid.show('Could\'n get your location', ToastAndroid.SHORT),
                    {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000}
                );})
            .catch(() => {
                ToastAndroid.show('You need to enable location.', ToastAndroid.SHORT)
            });
    }

    async showLocation(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const location = await getLocationDetails(longitude, latitude);
        this.setState({location: location});
        this.animate();
    }

    animate(){
        Animated.parallel([
            Animated.timing(this.state.searchingLeftPosition, {
                toValue:  -WINDOW_WIDTH,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(this.state.resultLeftPosition, {
                toValue:  0,
                duration: 200,
                useNativeDriver: false
            })
        ]).start();
    }

    saveLocation(){
        try {
            AsyncStorage.setItem('@home_location', JSON.stringify(this.state.location));
            AsyncStorage.setItem('@active_location', JSON.stringify(this.state.location));
            this.props.navigation.navigate('SetupScreen');
        } catch (e) {
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
        }
    }

    render(){
        const theme = this.state.theme;
        const navigation = this.props.navigation;

        return (
            <View style={{flex:1}}>
                <GeneralStatusBar opacity={0}/>
                <Animated.View style={[styles.absoluteView, {left: this.state.searchingLeftPosition}]}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <LottieView
                            style={{width: 150}}
                            source={require('../../../assets/lottie/location-searching')}
                            autoPlay
                            resizeMode="cover"
                            loop/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', paddingBottom: 20}}>
                        <CustomText style={{fontSize: 35, color: theme.mainText, textAlign: 'center'}}>Hold on one second</CustomText>
                        <CustomText style={{fontSize: 20, textAlign: 'center', color: theme.softText}}>Searching for your location, usually</CustomText>
                        <CustomText style={{fontSize: 20, textAlign: 'center', color: theme.softText}}>it dosen't take a lot of time.</CustomText>
                    </View>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <Pressable style={{borderRadius: 20,
                            borderColor: theme.softText,
                            borderWidth: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            width: '60%'}}
                                   android_ripple={{color: 'rgba(250,250,250,0.2)'}} onPress={() => navigation.goBack()}
                        >
                            <CustomText style={{fontSize: 25, color: theme.softText}}>cancel</CustomText>
                        </Pressable>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.absoluteView, {left: this.state.resultLeftPosition}]}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <LottieView
                            style={{width: 150}}
                            source={require('../../../assets/lottie/location-searching')}
                            progress={0.5}
                            resizeMode="cover"/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', paddingBottom: 20}}>
                        <CustomText style={{fontSize: 40, color: theme.mainText, textAlign: 'center'}}>{this.state.location.city}</CustomText>
                        <CustomText style={{fontSize: 20, textAlign: 'center', color: theme.softText}}>If you would like to see forecast in</CustomText>
                        <CustomText style={{fontSize: 20, textAlign: 'center', color: theme.softText}}>{this.state.location.city}, then accept it. If no, then</CustomText>
                        <CustomText style={{fontSize: 20, textAlign: 'center', color: theme.softText}}>pick another.</CustomText>
                    </View>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', paddingTop: 50}}>
                        <Pressable style={{
                            backgroundColor: '#2c82c9',
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            width: '80%'
                        }}
                                   onPress={() => this.saveLocation()}
                        >
                            <CustomText style={{fontSize: 25, color: theme.mainColor}}>accept location</CustomText>
                        </Pressable>
                        <Pressable
                            style={{justifyContent: 'center', alignItems: 'center', padding: 10, width: '80%'}}
                            onPress={() => navigation.navigate('CurrentLocationScreen')}
                        >
                            <CustomText style={{fontSize: 28, color: theme.mainText}}>pick a another</CustomText>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        )
    }
}



const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
   absoluteView:  {
       position: 'absolute',
       top: 40,
       height: WINDOW_HEIGHT,
       width: WINDOW_WIDTH
   }
});

export default CurrentLocationScreen;
