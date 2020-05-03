import React, {useState} from "react";
import {ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";

const WeatherViewSetting = () => {
    const [isWeatherView, setIsWeatherView] = useState(false);

    return (
        <MenuListItem visibility={isWeatherView}
                      setVisibility={setIsWeatherView}
                      image={require('../../../../assets/images/icons/change.png')}
                      title={'Weather view'}
                      settingsComponent={<WeatherViewSettings/>}
                      quantityOfSettings={1}
        />
    )
};

const WeatherViewSettings = () => {

    return (
        <ScrollView horizontal={true}>
            <TouchableOpacity style={styles.viewButton}>
                <CustomText style={styles.buttonText}>
                    week view
                </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.viewButton, {backgroundColor: 'rgba(50,50,150,0.5)'}]}>
                <CustomText style={styles.buttonText}>
                    day view
                </CustomText>
            </TouchableOpacity>
        </ScrollView>
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

export default WeatherViewSetting;
