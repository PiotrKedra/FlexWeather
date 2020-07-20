import React from "react";
import {Dimensions, Image, View, Text, Pressable, ToastAndroid, Animated} from "react-native";
import GeneralStatusBar from "../components/GeneralStatusBar";
import CustomText from "../components/CustomText";

const WINDOW_HEIGHT = Dimensions.get('window').height;
class WelcomeScreen extends React.PureComponent{

    state = {
        upImagePosition: new Animated.Value(-150),
        downImagePosition: new Animated.Value(-250),
    };

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.upImagePosition, {
                toValue:  -30,
                duration: 900,
                useNativeDriver: false
            }),
            Animated.timing(this.state.downImagePosition, {
                toValue:  -10,
                duration: 900,
                useNativeDriver: false
            })
        ]).start();
    }

    render() {

        return (
            <View style={{flex: 1, paddingHorizontal: '10%', backgroundColor: '#2C82C9'}}>
                <GeneralStatusBar opacity={0}/>
                <Animated.Image style={{width: 150, height: 150, position: 'absolute', top: 50, left: this.state.upImagePosition}} source={require('../../../assets/icon-cloud.png')}/>
                <Animated.Image style={{width: 150, height: 150, position: 'absolute', top: WINDOW_HEIGHT/2, right: this.state.downImagePosition}} source={require('../../../assets/icon-cloud.png')}/>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <CustomText style={{fontSize: 40, color: '#ddd'}}>Flex Weather</CustomText>
                    <Text style={{fontSize: 20, fontFamily: 'Neucha-Regular', textAlign: 'center', color: '#ddd'}}>Flexible weather forecast put into clear and lovely design.</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <Pressable style={{borderWidth: 2, borderRadius: 20, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 70, paddingVertical: 5}}
                                   onPress={() => this.props.navigation.navigate('SetupLocationScreen')}
                                   android_ripple={{color: 'rgba(250,250,250,0.2)'}}>
                            <CustomText style={{fontSize: 30, color: '#ddd'}}>let's begin</CustomText>
                        </Pressable>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CustomText style={{fontSize: 17, color: '#ccc'}}>1/3</CustomText>
                    </View>
                </View>

            </View>
        )
    }
}

export default WelcomeScreen;
