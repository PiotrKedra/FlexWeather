import React from "react";
import {View} from "react-native";
import MenuLocationComponent from "./MenuLocationComponent";
import MenuList from "./MenuList";


const Menu = (props) => {

    console.log(props);
    return (
        <View style={{width: '100%', height: '100%', }}>
            <MenuLocationComponent closeMenu={props.closeMenu}/>
            <MenuList/>
        </View>
    )
};

export default Menu;


