import React from "react";
import {View, TouchableOpacity, Image, Linking} from "react-native";
import MenuLocationComponent from "./MenuLocationComponent";
import CustomText from "../components/CustomText";
import {GOOGLE_PLAY_URL} from "./settingscreens/SupportScreen";

const Menu = (props) => {

    return (
        <View style={{width: '100%', height: '100%', }}>
            <MenuLocationComponent closeMenu={props.closeMenu} navigation={props.navigation}/>
            <View style={{paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20, justifyContent: 'space-around', flex: 1}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => props.navigation.navigate('SettingScreen')}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/settings.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Settings</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => props.navigation.navigate('AppearanceScreen')}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/theme.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Appearance</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => props.navigation.navigate('SupportScreen')}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/support.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Support</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/ratting.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Rate the app</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => props.navigation.navigate('AboutScreen')}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/about.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>About</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Menu;


