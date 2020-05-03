import React, {useState} from "react";
import {TouchableOpacity, StyleSheet, Image, View} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";

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
        <View style={styles.mainView}>
            <CustomText style={styles.homeLocationText}>
                Zabierzów
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
        flexDirection: 'row'
    },
    homeLocationText: {
        flex: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 23,
        color: '#222',
        backgroundColor: 'rgba(250,250,250,0.3)'
    },
    editButton: {
        flex: 1,
        marginLeft: 10,
    },
    editImage: {
        width: 30,
        height: 30
    },
});

export default HomeLocationItem;
