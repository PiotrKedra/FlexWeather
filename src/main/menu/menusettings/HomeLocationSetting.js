import React, {useState, useEffect} from "react";
import {TouchableOpacity, StyleSheet, Image, View} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";
import AsyncStorage from '@react-native-community/async-storage';

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

async function getHomeLocation(setHomeLocation) {
    try {
        const home = await AsyncStorage.getItem('@home_location');
        const city = JSON.parse(home).city;
        setHomeLocation(city);
    } catch (e) {
        console.log(e);
    }
}

const HomeLocationSettings = () => {

    const [homeLocation, setHomeLocation] = useState('-');

    useEffect(() => {
        getHomeLocation(setHomeLocation)
    }, []);
    return (
        <View style={styles.mainView}>
            <CustomText style={styles.homeLocationText}>
                {homeLocation}
            </CustomText>
            <TouchableOpacity style={styles.editButton}>
                <Image style={styles.editImage}
                       source={require('../../../../assets/images/icons/edit.png')}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 40
    },
    homeLocationText: {
        flex: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 23,
        color: '#222',
        backgroundColor: 'rgba(250,250,250,0.3)',
        marginRight: 10,
    },
    editButton: {
        flex: 1,
    },
    editImage: {
        width: 30,
        height: 30
    },
});

export default HomeLocationItem;
