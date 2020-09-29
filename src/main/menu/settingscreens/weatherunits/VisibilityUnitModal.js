import CustomModal from "../../../firstapplaunch/setupmodals/CustomModal";
import Text from "../../../components/CustomText";
import {Pressable, StyleSheet, View} from "react-native";
import CheckBox from "../../../components/CheckBox";
import React from "react";
import {connect} from "react-redux";
import {KILOMETERS, METERS, MILES} from "./UnitsValues";

const VisibilityUnitModal = ({isVisible, setVisible, theme, weatherUnits, setWeatherUnits}) => {

    const visibilityUnit = weatherUnits.visibility;

    return (
        <CustomModal isVisible={isVisible} setVisible={setVisible} mainColor={theme.mainColor}>
            <Text style={{fontSize: 30, color: theme.mainText}}>Visibility unit</Text>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, visibility: METERS}); setVisible(false)}}>
                <CheckBox checked={visibilityUnit===METERS} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>meters ({METERS})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, visibility: KILOMETERS}); setVisible(false)}}>
                <CheckBox checked={visibilityUnit===KILOMETERS} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>kilometers ({KILOMETERS})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, visibility: MILES}); setVisible(false)}}>
                <CheckBox checked={visibilityUnit===MILES} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>miles ({MILES})</Text>
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

export default connect(mapStateToProps, mapDispatcherToProps)(VisibilityUnitModal);
