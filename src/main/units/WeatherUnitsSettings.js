import {Image, Pressable, StyleSheet, ToastAndroid, View} from "react-native";
import CustomText from "../components/CustomText";
import React, {useState} from "react";
import {connect} from "react-redux";
import TempUnitModal from "./TempUnitModal";
import WindUnitModal from "./WIndUnitModal";
import VisibilityUnitModal from "./VisibilityUnitModal";
import PressureUnitModal from "./PressureUnitModal";
import ClockUnitModal from "./ClockUnitModal";

const WeatherUnitsSettings = ({theme, weatherUnits}) => {

    const [tempUnitModal, setTempUnitModal] = useState(false);
    const [windUnitModal, setWindUnitModal] = useState(false);
    const [pressureUnitModal, setPressureUnitModal] = useState(false);
    const [visibilityUnitModal, setVisibilityUnitModal] = useState(false);
    const [clockUnitModal, setClockUnitModal] = useState(false);

    return (
        <View>
            <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: theme.softBackgroundColor, alignItems: 'center'}}>
                <CustomText style={{fontSize: 20, color: '#2c82c9'}}>weather units</CustomText>
            </View>
            <Pressable style={styles.settingView}
                       onPress={() => setTempUnitModal(true)}
                       android_ripple={{color: '#ddd'}}>
                <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../assets/images/details/temperature.png')}/>
                <View>
                    <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>temperature</CustomText>
                    <CustomText style={[styles.settingInfo, {color: theme.softText}]}>{weatherUnits.temp}</CustomText>
                </View>
            </Pressable>
            <Pressable style={styles.settingView}
                       onPress={() => setWindUnitModal(true)}
                       android_ripple={{color: '#ddd'}}>
                <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../assets/images/details/wind-speed.png')}/>
                <View>
                    <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>wind</CustomText>
                    <CustomText style={[styles.settingInfo, {color: theme.softText}]}>{weatherUnits.wind}</CustomText>
                </View>
            </Pressable>
            <Pressable style={styles.settingView}
                       onPress={() => setPressureUnitModal(true)}
                       android_ripple={{color: '#ddd'}}>
                <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../assets/images/details/pressure.png')}/>
                <View>
                    <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>pressure</CustomText>
                    <CustomText style={[styles.settingInfo, {color: theme.softText}]}>{weatherUnits.pressure}</CustomText>
                </View>
            </Pressable>
            <Pressable style={styles.settingView}
                       onPress={() => setVisibilityUnitModal(true)}
                       android_ripple={{color: '#ddd'}}>
                <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../assets/images/details/visibility.png')}/>
                <View>
                    <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>visibility</CustomText>
                    <CustomText style={[styles.settingInfo, {color: theme.softText}]}>{weatherUnits.visibility}</CustomText>
                </View>
            </Pressable>
            <Pressable style={styles.settingView}
                       onPress={() => setClockUnitModal(true)}
                       android_ripple={{color: '#ddd'}}>
                <Image style={[styles.settingIcon, {tintColor: theme.iconColor}]} source={require('../../../assets/images/details/clock.png')}/>
                <View>
                    <CustomText style={[styles.settingTitle, {color: theme.mainText}]}>clock hours</CustomText>
                    <CustomText style={[styles.settingInfo, {color: theme.softText}]}>{weatherUnits.clock}</CustomText>
                </View>
            </Pressable>
            <TempUnitModal isVisible={tempUnitModal} setVisible={setTempUnitModal}/>
            <WindUnitModal isVisible={windUnitModal} setVisible={setWindUnitModal}/>
            <PressureUnitModal isVisible={pressureUnitModal} setVisible={setPressureUnitModal}/>
            <VisibilityUnitModal isVisible={visibilityUnitModal} setVisible={setVisibilityUnitModal}/>
            <ClockUnitModal isVisible={clockUnitModal} setVisible={setClockUnitModal}/>
        </View>
    )
}

const styles = StyleSheet.create({
    settingView: {flexDirection: 'row', alignItems: 'center', marginTop: 20, borderRadius: 10},
    settingIcon: {width: 40, height: 40, marginRight: 20},
    settingTitle: {fontSize: 20},
    settingInfo: {fontSize: 17, color: '#777'}
});

function mapStateToProps(state){
    return {
        theme: state.theme,
        weatherUnits: state.weatherUnits
    }
}

export default connect(mapStateToProps)(WeatherUnitsSettings);
