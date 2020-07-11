import React from "react";
import {Dimensions, StyleSheet, View, ScrollView, Text, TouchableOpacity, ToastAndroid} from "react-native";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import {getDarkTheme, getLightTheme} from "../../theme/Theme";


class AppearanceScreen extends React.PureComponent {

    state = {
        storageThemeId: this.props.theme.id,
        themeId: this.props.theme.id,
        mainColor: this.props.theme.mainColor,
        softBackgroundColor: this.props.theme.softBackgroundColor,
        mainTextColor: this.props.theme.mainText,
        softTextColor: this.props.theme.softText,
    };

    componentDidMount(){
        console.log(this.props.theme)
    }

    setTheme(theme){
        let themeEntity;
        if(theme==='light')
            themeEntity = getLightTheme();
        else if(theme==='dark')
            themeEntity = getDarkTheme();
        else if(theme==='system')
            themeEntity = getLightTheme();
        this.setState({
            themeId: theme,
            mainColor: themeEntity.mainColor,
            softBackgroundColor: themeEntity.softBackgroundColor,
            mainTextColor: themeEntity.mainText,
            softTextColor: themeEntity.softText
        })
    }

    isThemeChanged(){
        return this.state.themeId !== this.state.storageThemeId;
    }

    saveChanges(){
        if(this.isThemeChanged()) {
            AsyncStorage.setItem('@theme', this.state.themeId);
            //todo update to latest (+0.62) react native and change it for 'DevSettings.reload()' to fully reload app
            this.props.navigation.replace('AppLauncher');
        } else
            ToastAndroid.show('Nothing has changed.', ToastAndroid.SHORT)
    }

    render() {
        const selectedEleTextStyle = {textDecorationLine: 'underline', color: this.state.mainTextColor};
        const nonSelectedEleTextStyle = {color: this.state.softTextColor};
        return (
            <ScrollView style={[styles.scrollView, {backgroundColor: this.state.mainColor}]}>
                <View style={[styles.sectionView, {borderColor: this.state.softBackgroundColor}]}>
                    <Text style={[styles.titleText, {color: this.state.mainTextColor}]}>Theme</Text>
                    <TouchableOpacity onPress={() => this.setTheme('light')}>
                        <Text style={[styles.eleText, this.state.themeId==='light' ? selectedEleTextStyle : nonSelectedEleTextStyle]}>
                            light theme
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setTheme('dark')}>
                        <Text style={[styles.eleText, this.state.themeId==='dark' ? selectedEleTextStyle : nonSelectedEleTextStyle]}>
                            dark theme
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('need to implement system theme')}>
                        <Text style={[styles.eleText, this.state.themeId==='system' ? selectedEleTextStyle : nonSelectedEleTextStyle]}>
                            system theme
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.sectionView, {borderColor: this.state.softBackgroundColor}]}>
                    <Text style={[styles.titleText, {color: this.state.mainTextColor}]}>Font</Text>
                    <Text style={[styles.eleText, selectedEleTextStyle]}>neucha</Text>
                    <Text style={[styles.eleText, nonSelectedEleTextStyle]}>new font coming soon...</Text>
                </View>
                <View style={styles.saveView}>
                    <TouchableOpacity style={[styles.saveButton, this.isThemeChanged() ? {backgroundColor: '#2C82C9'} : null]}
                                      onPress={() => this.saveChanges()}>
                        <Text style={[styles.saveText, {color: this.isThemeChanged() ? this.state.mainColor : this.state.softTextColor}]}>
                            save
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
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
        paddingHorizontal: WINDOW_WIDTH / 20,
        marginTop: 10,
    },
    saveView: {
        width: '100%',
        alignItems: 'flex-end',
        marginVertical: 20
    },
    saveButton: {
        borderRadius: 3,
        paddingHorizontal: 30
    },
    saveText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 25,
    }
});

function mapStateToProps(state){
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(AppearanceScreen);
