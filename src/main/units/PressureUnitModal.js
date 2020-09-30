import CustomModal from "../firstapplaunch/setupmodals/CustomModal";
import Text from "../components/CustomText";
import {Pressable, StyleSheet, View} from "react-native";
import CheckBox from "../components/CheckBox";
import React from "react";
import {connect} from "react-redux";
import {HECTOPASCAL, MILLIBARS} from "./UnitsValues";

const PressureUnitModal = ({isVisible, setVisible, theme, weatherUnits, setWeatherUnits}) => {

    const pressureUnit = weatherUnits.pressure;

    return (
        <CustomModal isVisible={isVisible} setVisible={setVisible} mainColor={theme.mainColor}>
            <Text style={{fontSize: 30, color: theme.mainText}}>Pressure unit</Text>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, pressure: HECTOPASCAL}); setVisible(false)}}>
                <CheckBox checked={pressureUnit===HECTOPASCAL} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>hectopascal ({HECTOPASCAL})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, pressure: MILLIBARS}); setVisible(false)}}>
                <CheckBox checked={pressureUnit===MILLIBARS} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>millibars ({MILLIBARS})</Text>
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

export default connect(mapStateToProps, mapDispatcherToProps)(PressureUnitModal);
