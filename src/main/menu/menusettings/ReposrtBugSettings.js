import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";

const ReportBugSettings = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <MenuListItem visibility={isEnabled}
                      setVisibility={setIsEnabled}
                      image={require('../../../../assets/images/icons/bug.png')}
                      title={'Report a bug'}
                      settingsComponent={<ReportBugSettingsComponent/>}
                      quantityOfSettings={2}
        />
    )
};

const ReportBugSettingsComponent = () => {

    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.button}>
                <CustomText style={styles.buttonText}>
                    Send by email
                </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <CustomText style={styles.buttonText}>
                    Send by app
                </CustomText>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginTop: 1
    },
    buttonText: {
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 23,
        color: '#222',
        backgroundColor: 'rgba(250,250,250,0.3)',
        marginRight: 10
    }
});

export default ReportBugSettings;
