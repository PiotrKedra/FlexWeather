import React, {useState} from 'react';
import MenuListItem from "./MenuListItem";
import {StyleSheet, View, Text, Linking} from "react-native";
import CustomText from "../../components/CustomText";


const AboutSettings = () => {
    const [isAbout, setIsAbout] = useState(false);

    return (
        <MenuListItem visibility={isAbout}
                      setVisibility={setIsAbout}
                      image={require('../../../../assets/images/icons/about.png')}
                      title={'About'}
                      settingsComponent={<AboutDescription/>}
                      quantityOfSettings={3}
        />
    )
};

const AboutDescription = () => {

    return (
        <View style={styles.mainView}>
            <CustomText style={{fontSize: 20, color: '#333'}}>Application is developed</CustomText>
            <CustomText style={{fontSize: 20, color: '#333'}}>by Piotr Kedra.</CustomText>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, color: '#333', fontFamily: 'Neucha-Regular'}}>App icons by </Text>
                <Text style={{fontSize: 20, color: '#333', fontFamily: 'Neucha-Regular', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('https://icons8.com/')}>
                    icons8.
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainView: {
        marginLeft: 40,
        marginTop: 10,
    },
});

export default AboutSettings;
