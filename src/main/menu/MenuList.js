import React from "react";
import {ScrollView} from "react-native";
import WeatherViewSetting from "./menusettings/WeatherViewSetting";
import HomeLocationItem from "./menusettings/HomeLocationSetting";
import NotificationsSettings from "./menusettings/NotificatinosSettings";
import LanguageSettings from "./menusettings/LanguageSettings";
import ReportBugSettings from "./menusettings/ReposrtBugSettings";



const MenuList = () => {

    return (
        <ScrollView>
            <WeatherViewSetting/>
            <HomeLocationItem/>
            <NotificationsSettings/>
            <LanguageSettings/>
            <ReportBugSettings/>
        </ScrollView>
    )
};

export default MenuList;
