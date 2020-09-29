import React from "react";
import {View} from "react-native";
import WeatherUnitsSettings from "../menu/settingscreens/weatherunits/WeatherUnitsSettings";

const SetupUnitsScreen = () => {

    return (
        <View style={{margin: '10%'}}>
            <WeatherUnitsSettings/>
        </View>
    )
}

export default SetupUnitsScreen;
