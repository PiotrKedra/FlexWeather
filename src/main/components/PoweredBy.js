import React from "react";
import {View, StyleSheet} from "react-native";
import CustomText from "./CustomText";

const PoweredBy = () => {
    return (
        <View style={styles.view}>
            <CustomText style={styles.text}>
                Powered by Dark Sky
            </CustomText>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'flex-start',
        width: '95%'
    },
    text: {
        fontSize: 17,
        margin: 10
    }
});

export default PoweredBy;
