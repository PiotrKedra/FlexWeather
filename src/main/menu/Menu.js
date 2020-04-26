import React, {useState} from "react";
import {Image, TouchableOpacity, View} from "react-native";
import CustomText from "../components/CustomText";

const Menu = () => {
    const [isHomeLocation, setIsHomeLocation] = useState(false);

    return (
        <View style={{width: '100%', height: '100%', padding: 20, marginTop: 50}}>
            <View>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setIsHomeLocation(!isHomeLocation)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/pin.png')}/>
                    <CustomText style={{fontSize: 25, marginLeft: 10}}>Home location</CustomText>
                </TouchableOpacity>
                {isHomeLocation ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
        </View>
    )
};

export default Menu;
