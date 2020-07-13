import React, {useState} from "react";
import {Appearance, Pressable, StyleSheet, View} from 'react-native';
import CustomModal from "./CustomModal";
import Text from "../../components/CustomText";
import CheckBox from "./CheckBox";
import {getDarkTheme, getLightTheme} from "../../theme/Theme";

const ThemeModal = ({isVisible, setVisible, themeId, theme, setTheme}) => {

    const light = themeId === 'light';
    const dark = themeId === 'dark';
    const system = themeId === 'system';

    return (
        <CustomModal isVisible={isVisible} setVisible={setVisible} mainColor={theme.mainColor}>
            <Text style={{fontSize: 30, color: theme.mainText}}>Theme</Text>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setTheme('light', getLightTheme()); setVisible(false)}}>
                <CheckBox checked={light} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>light theme</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setVisible(false); setTheme('dark', getDarkTheme())}}>
                <CheckBox checked={dark} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>dark theme</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setVisible(false); setTheme('system', getSystemTheme())}}>
                <CheckBox checked={system} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>system theme</Text>
            </Pressable>
            <View style={{alignItems: 'flex-end'}}>
                <Pressable onPress={() => setVisible(false)}
                           android_ripple={{color: '#ddd'}}>
                    <Text style={{fontSize: 25, color: theme.mainText}}>cancel</Text>
                </Pressable>
            </View>
        </CustomModal>
    )
};

const styles = StyleSheet.create({
    themeEle: {fontSize: 22, padding: 3},
});

export default ThemeModal;
