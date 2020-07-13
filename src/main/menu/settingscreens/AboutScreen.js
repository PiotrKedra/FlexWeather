import React from "react";
import {View, Image, Dimensions, ScrollView, Text, Linking, StyleSheet} from "react-native";
import {connect} from "react-redux";

const AboutScreen = ({theme}) => {

    const titleTextStyle = [styles.titleText, {color: theme.mainText}];
    const contentTextStyle = [styles.contentText, {color: theme.softText}];
    return (
        <ScrollView style={[styles.scrollView, {backgroundColor: theme.mainColor}]}>
            <View style={styles.logoView}>
                <Image style={styles.logoImage} source={require('../../../../assets/logo.png')}/>
            </View>
            <View style={styles.itemView}>
                <Text style={titleTextStyle}>version</Text>
                <Text style={contentTextStyle}>beta 0.2</Text>
            </View>
            <View style={styles.itemView}>
                <Text style={titleTextStyle}>author</Text>
                <Text style={contentTextStyle}>Piotr Kedra</Text>
            </View>
            <View style={styles.itemView}>
                <Text style={titleTextStyle}>contact</Text>
                <Text style={[contentTextStyle ,{textDecorationLine: 'underline'}]}
                      onPress={() => Linking.openURL('mailto:pkedra.studio@gmail.com')}>
                    pkedra.studio@gmail.com
                </Text>
            </View>
            <View style={styles.itemView}>
                <Text style={titleTextStyle}>website</Text>
                <Text style={[contentTextStyle, {textDecorationLine: 'underline'}]}
                      onPress={() => Linking.openURL('https://flexweather.github.io')}>
                    flexweather.github.io
                </Text>
            </View>
            <View style={[styles.itemView, {paddingBottom: 30}]}>
                <Text style={titleTextStyle}>created with</Text>
                <Text style={contentTextStyle}>  {'\u2022'} react-native</Text>
                <Text style={contentTextStyle}>  {'\u2022'} github</Text>
                <Text style={contentTextStyle}>  {'\u2022'} web storm</Text>
                <Text style={contentTextStyle}>  {'\u2022'} open weather map</Text>
                <Text style={contentTextStyle}>  {'\u2022'} foreca</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={contentTextStyle}>  {'\u2022'} app icons by </Text>
                    <Text style={[contentTextStyle, {textDecorationLine: 'underline'}]}
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
    },

});

function mapStateToProps(state){
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(AboutScreen);
