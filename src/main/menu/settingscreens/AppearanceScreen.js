import React from "react";
import {Dimensions, StyleSheet, View, ScrollView, Text,TouchableOpacity} from "react-native";


const AppearanceScreen = () => {

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.sectionView}>
                <Text style={styles.titleText}>Theme</Text>
                <Text style={[styles.eleText, {textDecorationLine: 'underline'}]}>light theme</Text>
                <Text style={[styles.eleText]}>dark theme</Text>
                <Text style={[styles.eleText]}>system theme</Text>
            </View>
            <View style={styles.sectionView}>
                <Text style={styles.titleText}>Font</Text>
                <Text style={[styles.eleText, {textDecorationLine: 'underline'}]}>neucha</Text>
                <Text style={[styles.eleText]}>new font coming soon...</Text>
            </View>
            <View style={styles.saveView}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#eee',
        paddingHorizontal: WINDOW_WIDTH / 10
    },
    sectionView: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 10
    },
    titleText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 25
    },
    eleText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 22,
        color: '#555',
        paddingHorizontal: WINDOW_WIDTH / 20,
        marginTop: 10,
    },
    saveView: {
        width: '100%',
        alignItems: 'flex-end',
        marginVertical: 20
    },
    saveButton: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#bbb',
        paddingHorizontal: 30
    },
    saveText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 25,
        color: '#bbb',
    }
});

export default AppearanceScreen;
