import React from "react";
import {View, TouchableOpacity, Image} from "react-native";
import MenuLocationComponent from "./MenuLocationComponent";
import MenuList from "./MenuList";
import CustomText from "../components/CustomText";


const Menu = (props) => {

    return (
        <View style={{width: '100%', height: '100%', }}>
            <MenuLocationComponent closeMenu={props.closeMenu} navigation={props.navigation}/>
            {/*<MenuList/>*/}
            <View style={{paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20, justifyContent: 'space-around', flex: 1}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/edit.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Settings</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/edit.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Appearance</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/edit.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Support</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/edit.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Rate the app</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => props.navigation.navigate('AboutScreen')}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/edit.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>About</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Menu;


