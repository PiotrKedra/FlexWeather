import React from "react";
import {View} from "react-native";
import MenuLocationComponent from "./MenuLocationComponent";
import MenuList from "./MenuLIst";


const Menu = () => {

    return (
        <View style={{width: '100%', height: '100%', }}>
            <MenuLocationComponent/>
            <MenuList/>
        </View>
    )
};

export default Menu;


