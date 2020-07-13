import React from 'react';
import {Dimensions, StyleSheet, View, Text, ScrollView, Linking, Image} from "react-native";
import {connect} from "react-redux";

const SupportScreen = ({theme}) => {

    const textStyle = [styles.text, {color: theme.mainText}];
    return (
        <ScrollView style={[styles.mainView, {backgroundColor: theme.mainColor}]}>
            <View style={styles.logoView}>
                <Image style={styles.logoImage} source={require('../../../../assets/logo.png')}/>
            </View>
            <View style={{marginVertical: 20}}>
                <Text style={[textStyle, {marginTop: 10}]}>Hi!</Text>
                <Text style={[textStyle, {marginTop: 10}]}>Do you have any problem with the app? Or you just want to say how much you like it?</Text>
                <Text style={{marginTop: 10}}>
                    <Text style={textStyle}>
                        {'Write to me through the opinion section in '}
                    </Text>
                    <Text style={[textStyle, {textDecorationLine: 'underline'}]}
                          onPress={() => redirectToStorePage()}
                    >
                        google play
                    </Text>
                    <Text style={textStyle}>{' or by sending mail to '}</Text>
                    <Text style={[textStyle, {textDecorationLine: 'underline'}]}
                          onPress={() => sendMail()}
                    >
                        pkedra.studio@gmail.com
                    </Text>
                    <Text style={textStyle}>.</Text>
                </Text>
                <Text style={[textStyle, {marginTop: 10}]}>I will write back for sure!</Text>
            </View>
        </ScrollView>
    )
};

function sendMail() {
    Linking.openURL('mailto:pkedra.studio@gmail.com');
}

function redirectToStorePage(){
    Linking.openURL('market://details?id=myandroidappid');
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#eee',
        paddingHorizontal: SCREEN_WIDTH/10
    },
    logoView: {
        paddingTop: 40
    },
    logoImage: {
        width: 45,
        height: 45,
        borderRadius: 45,
    },
    text: {
        fontFamily: 'Neucha-Regular',
        fontSize: 27,
    },
});

function mapStateToProps(state){
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(SupportScreen);
