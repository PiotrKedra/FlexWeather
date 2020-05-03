import React, {useState} from "react";
import {Image, TouchableOpacity, View, ScrollView, StyleSheet, Animated} from "react-native";
import CustomText from "../components/CustomText";
import WeatherViewSetting from "./menusettings/WeatherViewSetting";
import HomeLocationItem from "./menusettings/HomeLocationSetting";
import NotificationsSettings from "./menusettings/NotificatinosSettings";



const MenuList = () => {
    const [isNotification, setIsNotification] = useState(false);

    return (
        <ScrollView>
            <WeatherViewSetting/>
            <HomeLocationItem/>
            <NotificationsSettings/>
            <View style={styles.menuEle}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => setIsNotification(!isNotification)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/language.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Language</CustomText>
                </TouchableOpacity>
                {isNotification ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
            <View style={styles.menuEle}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => setIsNotification(!isNotification)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/bug.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Report a bug</CustomText>
                </TouchableOpacity>
                {isNotification ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    menuEle: {
        marginVertical: 7,
        paddingHorizontal: 20
    },
    menuEleText: {
        flexDirection: 'row'
    }
});

export default MenuList;
