import React from "react";
import {ScrollView} from "react-native";
import HomeLocationItem from "./menusettings/HomeLocationSetting";
import NotificationsSettings from "./menusettings/NotificatinosSettings";
import LanguageSettings from "./menusettings/LanguageSettings";
import ReportBugSettings from "./menusettings/ReposrtBugSettings";
import AboutSettings from "./menusettings/AboutSettings";



const MenuList = () => {

    return (
        <ScrollView>
            <HomeLocationItem/>
            <NotificationsSettings/>
            <LanguageSettings/>
            <ReportBugSettings/>
            <AboutSettings/>
        </ScrollView>
    )
};

export default MenuList;
