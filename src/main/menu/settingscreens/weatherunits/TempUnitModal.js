import CustomModal from "../../../firstapplaunch/setupmodals/CustomModal";
import Text from "../../../components/CustomText";
import {Pressable, StyleSheet, View} from "react-native";
import CheckBox from "../../../components/CheckBox";
import React from "react";
import {connect} from "react-redux";
import {CELSIUS, FAHRENHEIT} from "./UnitsValues";

const TempUnitModal = ({isVisible, setVisible, theme, weatherUnits, setWeatherUnits}) => {

    const tempUnit = weatherUnits.temp;

    return (
        <CustomModal isVisible={isVisible} setVisible={setVisible} mainColor={theme.mainColor}>
            <Text style={{fontSize: 30, color: theme.mainText}}>Temperature unit</Text>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, temp: CELSIUS}); setVisible(false)}}>
                <CheckBox checked={tempUnit===CELSIUS} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>celsius ({CELSIUS})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, temp: FAHRENHEIT}); setVisible(false)}}>
                <CheckBox checked={tempUnit===FAHRENHEIT} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>Fahrenheit ({FAHRENHEIT})</Text>
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

function mapStateToProps(state){
    return {
        theme: state.theme,
        weatherUnits: state.weatherUnits
    }
}

function mapDispatcherToProps(dispatch){
    return {
        setWeatherUnits: (weatherUnits) => dispatch({type: 'WEATHER_UNITS', payload: weatherUnits}),
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(TempUnitModal);
