import React, {useState} from "react";
import {ScrollView, TouchableOpacity, StyleSheet, Image, View} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";
import LocationSearch from "../../location/LocationSearch";

const HomeLocationItem = () => {
    const [isHomeLocation, setIsHomeLocation] = useState(false);

    return (
        <MenuListItem visibility={isHomeLocation}
                      setVisibility={setIsHomeLocation}
                      image={require('../../../../assets/images/icons/home.png')}
                      title={'Home location'}
                      settingsComponent={<HomeLocationSettings/>}
                      quantityOfSettings={1}
        />
    )
};

const HomeLocationSettings = () => {

    return (
        <View style={{marginTop: 10, flexDirection: 'row'}}>
            <CustomText style={{borderRadius: 10, paddingHorizontal: 10, fontSize: 23, color: '#222', flex: 5, backgroundColor: 'rgba(250,250,250,0.3)'}}>
                Zabierzów
            </CustomText>
            <TouchableOpacity style={{marginLeft: 10, justifySelf: 'flex-end', flex: 1}}>
                <Image style={{width: 30, height: 30}} source={require('../../../../assets/images/icons/edit.png')}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    viewButton: {
        backgroundColor: 'rgba(150,150,150,0.3)',
        borderRadius: 15,
        paddingVertical: 3,
        paddingHorizontal: 10,
        margin: 5
    },
    buttonText: {
        fontSize: 18
    }
});

export default HomeLocationItem;
