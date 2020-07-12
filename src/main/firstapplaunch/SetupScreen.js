import React from "react";
import {ScrollView, View, Image, Pressable, StyleSheet, Dimensions, ToastAndroid} from "react-native";
import GeneralStatusBar from "../components/GeneralStatusBar";
import CustomText from "../components/CustomText";

class SetupScreen extends React.PureComponent{

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <GeneralStatusBar opacity={0}/>
                    <View style={{justifyContent: 'center', marginLeft: '10%', paddingBottom: 20, marginTop: 20}}>
                        <CustomText style={{fontSize: 35}}>Choose what you like!</CustomText>
                        <CustomText style={{fontSize: 20, color: '#777'}}>or keep default, you can change it later.</CustomText>
                    </View>
                    <View style={{justifyContent: 'center', paddingHorizontal: '10%'}}>
                        <View>
                            <CustomText style={{fontSize: 20, color: '#2c82c9', paddingBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}}>settings</CustomText>
                        </View>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={styles.settingIcon} source={require('../../../assets/images/icons/provider.png')}/>
                            <View>
                                <CustomText style={styles.settingTitle}>weather provider</CustomText>
                                <CustomText style={styles.settingInfo}>open weather map</CustomText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={styles.settingIcon} source={require('../../../assets/images/icons/notifications.png')}/>
                            <View>
                                <CustomText style={styles.settingTitle}>notifications</CustomText>
                                <CustomText style={styles.settingInfo}>choose if you want to receive</CustomText>
                                <CustomText style={styles.settingInfo}>notifications</CustomText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={styles.settingIcon} source={require('../../../assets/images/icons/units.png')}/>
                            <View>
                                <CustomText style={styles.settingTitle}>weather units</CustomText>
                                <CustomText style={styles.settingInfo}>choose your weather units</CustomText>
                            </View>
                        </Pressable>
                        <View>
                            <CustomText style={{fontSize: 20, color: '#2c82c9', marginTop: 20, paddingBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}}>appearance</CustomText>
                        </View>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={styles.settingIcon} source={require('../../../assets/images/icons/theme.png')}/>
                            <View>
                                <CustomText style={styles.settingTitle}>theme</CustomText>
                                <CustomText style={styles.settingInfo}>system theme (light)</CustomText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={styles.settingIcon} source={require('../../../assets/images/icons/font.png')}/>
                            <View>
                                <CustomText style={styles.settingTitle}>font</CustomText>
                                <CustomText style={styles.settingInfo}>neucha</CustomText>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row', paddingBottom: 15}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CustomText style={{fontSize: 17, color: '#777'}}>2/3</CustomText>
                    </View>
                    <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}
                               android_ripple={{color: '#ddd'}}
                               onPress={() => this.props.navigation.navigate('FirstAppLaunch')}
                    >
                        <CustomText style={{fontSize: 30, color: '#2c82c9', paddingRight: Dimensions.get('window').width/10}}>next</CustomText>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    settingView: {flexDirection: 'row', alignItems: 'center', marginTop: 20, borderRadius: 10},
    settingIcon: {width: 40, height: 40, marginRight: 20},
    settingTitle: {fontSize: 20},
    settingInfo: {fontSize: 17, color: '#777'}
});

export default SetupScreen;
