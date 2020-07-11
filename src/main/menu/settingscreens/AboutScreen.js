import React from "react";
import {View, Image, Dimensions, ScrollView, Text, Linking, StyleSheet} from "react-native";

const AboutScreen = () => {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.logoView}>
                <Image style={styles.logoImage} source={require('../../../../assets/logo.png')}/>
            </View>
            <View style={styles.itemView}>
                <Text style={styles.titleText}>version</Text>
                <Text style={styles.contentText}>beta 0.2</Text>
            </View>
            <View style={styles.itemView}>
                <Text style={styles.titleText}>author</Text>
                <Text style={styles.contentText}>Piotr Kedra</Text>
            </View>
            <View style={styles.itemView}>
                <Text style={styles.titleText}>contact</Text>
                <Text style={[styles.contentText ,{textDecorationLine: 'underline'}]}
                      onPress={() => Linking.openURL('mailto:pkedra.studio@gmail.com')}>
                    pkedra.studio@gmail.com
                </Text>
            </View>
            <View style={styles.itemView}>
                <Text style={styles.titleText}>website</Text>
                <Text style={[styles.contentText, {textDecorationLine: 'underline'}]}
                      onPress={() => Linking.openURL('https://flexweather.github.io')}>
                    flexweather.github.io
                </Text>
            </View>
            <View style={[styles.itemView, {paddingBottom: 30}]}>
                <Text style={styles.titleText}>created with</Text>
                <Text style={styles.contentText}>  {'\u2022'} react-native</Text>
                <Text style={styles.contentText}>  {'\u2022'} github</Text>
                <Text style={styles.contentText}>  {'\u2022'} web storm</Text>
                <Text style={styles.contentText}>  {'\u2022'} open weather map</Text>
                <Text style={styles.contentText}>  {'\u2022'} forca</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.contentText}>  {'\u2022'} app icons by </Text>
                    <Text style={[styles.contentText, {textDecorationLine: 'underline'}]}
                          onPress={() => Linking.openURL('https://icons8.com/')}>
                        icons8
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
};

const HALF_WINDOW_WIDTH = Dimensions.get('window').width/2;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#eee',
        paddingHorizontal: HALF_WINDOW_WIDTH/4
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30
    },
    logoImage: {
        width: HALF_WINDOW_WIDTH,
        height: HALF_WINDOW_WIDTH,
        borderRadius: HALF_WINDOW_WIDTH
    },
    itemView: {
        marginTop: 30,
    },
    titleText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 22
    },
    contentText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 22,
        color: '#666'
    },

});

export default AboutScreen;
