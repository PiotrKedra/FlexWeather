import React from "react";
import {Image, Pressable, ScrollView, StyleSheet, ToastAndroid, View} from "react-native";
import CustomText from "../../components/CustomText";
import {connect} from "react-redux";
import WeatherUnitsSettings from "./weatherunits/WeatherUnitsSettings";

const SettingScreen = ({theme}) => {

    return (
        <ScrollView style={{backgroundColor: theme.mainColor, paddingHorizontal: '10%'}}>
            <View style={{marginTop: 30}}>
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: theme.softBackgroundColor, alignItems: 'center'}}>
                    <CustomText style={{fontSize: 20, color: '#2c82c9'}}>notifications</CustomText>
                </View>
                <Pressable style={styles.settingView}
                           onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                           android_ripple={{color: '#ddd'}}>
                    <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../../assets/images/icons/notifications.png')}/>
                    <View>
                        <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>weather alerts</CustomText>
                        <CustomText style={[styles.settingInfo, {color: theme.softText}]}>off</CustomText>
                    </View>
                </Pressable>
                <Pressable style={styles.settingView}
                           onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                           android_ripple={{color: '#ddd'}}>
                    <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../../assets/images/icons/notifications.png')}/>
                    <View>
                        <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>weather in notification bar</CustomText>
                        <CustomText style={[styles.settingInfo, {color: theme.softText}]}>off</CustomText>
                    </View>
                </Pressable>
            </View>
            <WeatherUnitsSettings/>
            <View style={{marginBottom: 30}}>
                <View>
                    <CustomText style={{fontSize: 20, color: '#2c82c9', paddingBottom: 5, borderBottomWidth: 1, borderColor: theme.softBackgroundColor}}>weather</CustomText>
                </View>
                <Pressable style={styles.settingView}
                           onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                           android_ripple={{color: '#ddd'}}>
                    <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../../assets/images/icons/provider.png')}/>
                    <View>
                        <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>weather provider</CustomText>
                        <CustomText style={[styles.settingInfo, {color: theme.softText}]}>open weather map</CustomText>
                    </View>
                </Pressable>
                <Pressable style={styles.settingView}
                           onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                           android_ripple={{color: '#ddd'}}>
                    <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../../assets/images/icons/edit.png')}/>
                    <View>
                        <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>refresh time</CustomText>
                        <CustomText style={[styles.settingInfo, {color: theme.softText}]}>60 min8</CustomText>
                    </View>
                </Pressable>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    settingView: {flexDirection: 'row', alignItems: 'center', marginTop: 20, borderRadius: 10},
    settingIcon: {width: 40, height: 40, marginRight: 20},
    settingTitle: {fontSize: 20},
    settingInfo: {fontSize: 17, color: '#777'}
});

function mapStateToProps(state) {
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(SettingScreen);
