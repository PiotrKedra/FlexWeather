import CustomModal from "../firstapplaunch/setupmodals/CustomModal";
import Text from "../components/CustomText";
import {Pressable, StyleSheet, View} from "react-native";
import CheckBox from "../components/CheckBox";
import React from "react";
import {connect} from "react-redux";
import {BEAUFORT_SCALE, KILOMETERS_PER_HOUR, KNOT, METERS_PER_SECOND, MILES_PER_HOUR} from "./UnitsValues";

const WindUnitModal = ({isVisible, setVisible, theme, weatherUnits, setWeatherUnits}) => {

    const windUnit = weatherUnits.wind;

    return (
        <CustomModal isVisible={isVisible} setVisible={setVisible} mainColor={theme.mainColor}>
            <Text style={{fontSize: 30, color: theme.mainText}}>Wind unit</Text>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, wind: KILOMETERS_PER_HOUR}); setVisible(false)}}>
                <CheckBox checked={windUnit===KILOMETERS_PER_HOUR} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>kilometer per hour ({KILOMETERS_PER_HOUR})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, wind: METERS_PER_SECOND}); setVisible(false)}}>
                <CheckBox checked={windUnit===METERS_PER_SECOND} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>meters per second ({METERS_PER_SECOND})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, wind: MILES_PER_HOUR}); setVisible(false)}}>
                <CheckBox checked={windUnit===MILES_PER_HOUR} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>miles per hour ({MILES_PER_HOUR})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, wind: KNOT}); setVisible(false)}}>
                <CheckBox checked={windUnit===KNOT} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>knot ({KNOT})</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}
                       android_ripple={{color: '#ddd'}}
                       onPress={() => {setWeatherUnits({ ...weatherUnits, wind: BEAUFORT_SCALE}); setVisible(false)}}>
                <CheckBox checked={windUnit===BEAUFORT_SCALE} color={theme.mainText}/>
                <Text style={[styles.themeEle, {color: theme.mainText}]}>Beaufort scale ({BEAUFORT_SCALE})</Text>
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

export default connect(mapStateToProps, mapDispatcherToProps)(WindUnitModal);
