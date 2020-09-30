import React from "react";
import {
    ScrollView,
    View,
    Image,
    Pressable,
    StyleSheet,
    Dimensions,
    ToastAndroid,
    BackHandler
} from "react-native";
import GeneralStatusBar from "../components/GeneralStatusBar";
import CustomText from "../components/CustomText";
import {getSystemTheme} from "../theme/Theme";
import ThemeModal from "./setupmodals/ThemeModal";
import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from '@react-navigation/native';
import {connect} from "react-redux";
import {DEFAULT_UNITS} from "../units/UnitsService";

class SetupScreen extends React.PureComponent{

    state = {
        themeId: 'system',
        theme: getSystemTheme(),
        isThemeModal: false,
        onBackPress: () => {
            this.props.navigation.navigate('SetupLocationScreen');
            return true;
        }
    };

    componentDidMount() {
        this.props.setDefaultUnits(DEFAULT_UNITS);
        BackHandler.addEventListener('hardwareBackPress', this.state.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.state.onBackPress);
    }

    setTheme = (themeId, theme) => {
        try{
            AsyncStorage.setItem('@theme', themeId);
        } catch (e) {
            console.log(e);
        }
        this.setState({themeId: themeId, theme: theme});
    };

    setIsThemeModal = (value) => {
        this.setState({isThemeModal: value})
    };

    render() {
        const units = this.props.weatherUnits ? this.props.weatherUnits : DEFAULT_UNITS;
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.mainColor}}>
                <ScrollView>
                    <GeneralStatusBar opacity={0}/>
                    <View style={{justifyContent: 'center', marginLeft: '10%', paddingBottom: 20, marginTop: 20}}>
                        <CustomText style={{fontSize: 35, color: this.state.theme.mainText}}>Choose what you like!</CustomText>
                        <CustomText style={{fontSize: 20, color: this.state.theme.softText}}>or keep default, you can change it later.</CustomText>
                    </View>
                    <View style={{justifyContent: 'center', paddingHorizontal: '10%'}}>
                        <View>
                            <CustomText style={{fontSize: 20, color: '#2c82c9', paddingBottom: 5, borderBottomWidth: 1, borderColor: this.state.theme.softBackgroundColor}}>settings</CustomText>
                        </View>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={[styles.settingIcon, {tintColor: this.state.theme.mainText}]} source={require('../../../assets/images/icons/provider.png')}/>
                            <View>
                                <CustomText style={[styles.settingTitle, {color: this.state.theme.mainText}]}>weather provider</CustomText>
                                <CustomText style={[styles.settingInfo, {color: this.state.theme.softText}]}>open weather map</CustomText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={[styles.settingIcon, {tintColor: this.state.theme.mainText}]} source={require('../../../assets/images/icons/notifications.png')}/>
                            <View>
                                <CustomText style={[styles.settingTitle, {color: this.state.theme.mainText}]}>notifications</CustomText>
                                <CustomText style={[styles.settingInfo, {color: this.state.theme.softText}]}>all disabled</CustomText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.settingView}
                                   onPress={() => {this.props.navigation.navigate('SetupUnitsScreen'); BackHandler.removeEventListener('hardwareBackPress', this.state.onBackPress);}}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={[styles.settingIcon, {tintColor: this.state.theme.mainText}]} source={require('../../../assets/images/icons/units.png')}/>
                            <View>
                                <CustomText style={[styles.settingTitle, {color: this.state.theme.mainText}]}>weather units</CustomText>
                                <CustomText style={[styles.settingInfo, {color: this.state.theme.softText}]}>
                                    {units.temp}, {units.wind}, {units.pressure}, {units.visibility}, {units.clock}
                                </CustomText>
                            </View>
                        </Pressable>
                        <View>
                            <CustomText style={{fontSize: 20, color: '#2c82c9', marginTop: 20, paddingBottom: 5, borderBottomWidth: 1, borderColor: this.state.theme.softBackgroundColor}}>appearance</CustomText>
                        </View>
                        <Pressable style={styles.settingView}
                                   onPress={() => this.setState({isThemeModal: true})}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={[styles.settingIcon, {tintColor: this.state.theme.mainText}]} source={require('../../../assets/images/icons/theme.png')}/>
                            <View>
                                <CustomText style={[styles.settingTitle, {color: this.state.theme.mainText}]}>theme</CustomText>
                                <CustomText style={[styles.settingInfo, {color: this.state.theme.softText}]}>
                                    {this.state.themeId} theme {this.state.themeId==='system' ? '(' + this.state.theme.id + ')' : null}
                                </CustomText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.settingView}
                                   onPress={() => ToastAndroid.show('coming soon...', ToastAndroid.SHORT)}
                                   android_ripple={{color: '#ddd'}}>
                            <Image style={[styles.settingIcon, {tintColor: this.state.theme.mainText}]} source={require('../../../assets/images/icons/font.png')}/>
                            <View>
                                <CustomText style={[styles.settingTitle, {color: this.state.theme.mainText}]}>font</CustomText>
                                <CustomText style={[styles.settingInfo, {color: this.state.theme.softText}]}>neucha</CustomText>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row', paddingBottom: 15}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CustomText style={{fontSize: 17, color: '#777'}}>3/3</CustomText>
                    </View>
                    <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}
                               android_ripple={{color: '#ddd'}}
                               onPress={() => this.props.navigation
                                   .dispatch(
                                       CommonActions.reset({
                                           routes: [{name: 'AppLauncher'}],
                                           index: 0
                                       })
                                   )
                               }
                    >
                        <CustomText style={{fontSize: 30, color: '#2c82c9', paddingRight: Dimensions.get('window').width/10}}>begin</CustomText>
                    </Pressable>
                </View>
                <ThemeModal isVisible={this.state.isThemeModal} setVisible={this.setIsThemeModal} themeId={this.state.themeId} theme={this.state.theme} setTheme={this.setTheme}/>
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

function mapStateToProps(state){
    return {
        weatherUnits: state.weatherUnits
    }
}

function mapDispatchToProps(dispatch){
    return {
        setDefaultUnits: (weatherUnits) => dispatch({type: 'WEATHER_UNITS', payload: weatherUnits}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
