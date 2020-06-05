import React, {useState} from "react";
import {StyleSheet, ScrollView, TouchableOpacity, View} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";

const LanguageSettings = () => {
    const [isLanguage, setIsLanguage] = useState(false);

    return (
        <MenuListItem visibility={isLanguage}
                      setVisibility={setIsLanguage}
                      image={require('../../../../assets/images/icons/language.png')}
                      title={'Language'}
                      settingsComponent={<LanguageSettingsComponent/>}
                      quantityOfSettings={1}
        />
    )
};

const LanguageSettingsComponent = () => {

    return (
        <ScrollView horizontal={true}
                    style={styles.scrollView}>
            <CustomText style={{fontSize: 20, color: '#333'}}>coming soon ...</CustomText>
            {/*<TouchableOpacity style={[styles.languageButton, {backgroundColor: 'rgba(250,30,3,0.4)'}]}>*/}
            {/*    <CustomText style={styles.languageText}>*/}
            {/*        en*/}
            {/*    </CustomText>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity style={styles.languageButton}>*/}
            {/*    <CustomText style={styles.languageText}>*/}
            {/*        pl*/}
            {/*    </CustomText>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity style={styles.languageButton}>*/}
            {/*    <CustomText style={styles.languageText}>*/}
            {/*        de*/}
            {/*    </CustomText>*/}
            {/*</TouchableOpacity>*/}
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    scrollView: {
        marginTop: 5,
        marginLeft: 40
    },
    languageButton: {
        width: 38,
        alignItems: 'center',
        backgroundColor: 'rgba(33,33,33,0.4)',
        borderWidth: 1,
        borderRadius: 13,
        marginRight: 5,
    },
    languageText: {
        fontSize: 22,
        paddingHorizontal: 5
    }
});

export default LanguageSettings;
