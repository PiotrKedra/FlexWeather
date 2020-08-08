import React from "react";
import {Dimensions, StyleSheet, View, ScrollView, Text, TouchableOpacity, ToastAndroid, Pressable, Image} from "react-native";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import getStorageTheme, {getDarkTheme, getLightTheme, getSystemTheme} from "../../theme/Theme";
import CheckBox from "../../components/CheckBox";

class AppearanceScreen extends React.PureComponent {

    state = {
        storageThemeId: this.props.theme.id,
        themeId: this.props.theme.id,
        mainColor: this.props.theme.mainColor,
        softBackgroundColor: this.props.theme.softBackgroundColor,
        mainTextColor: this.props.theme.mainText,
        softTextColor: this.props.theme.softText,
        iconColor: this.props.theme.iconColor
    };

    setTheme(theme){
        let themeEntity;
        if(theme==='light')
            themeEntity = getLightTheme();
        else if(theme==='dark')
            themeEntity = getDarkTheme();
        else if(theme==='system')
            themeEntity = getSystemTheme();
        this.setState({
            themeId: theme,
            mainColor: themeEntity.mainColor,
            softBackgroundColor: themeEntity.softBackgroundColor,
            mainTextColor: themeEntity.mainText,
            softTextColor: themeEntity.softText,
            iconColor: themeEntity.iconColor
        })
    }

    isThemeChanged(){
        return this.state.themeId !== this.state.storageThemeId;
    }

    async saveChanges(){
        if(this.isThemeChanged()) {
            await AsyncStorage.setItem('@theme', this.state.themeId);
            this.props.setTheme(await getStorageTheme());
            this.props.navigation.goBack();
        } else
            ToastAndroid.show('Nothing has changed.', ToastAndroid.SHORT)
    }

    render() {
        const selectedEleTextStyle = {textDecorationLine: 'underline', color: this.state.mainTextColor};
        const nonSelectedEleTextStyle = {color: this.state.softTextColor};
        return (
            <ScrollView style={[styles.scrollView, {backgroundColor: this.state.mainColor}]}>
                <View style={[styles.sectionView, {borderColor: this.state.softBackgroundColor}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={[styles.titleImage, {tintColor: this.state.iconColor}]} source={require('../../../../assets/images/icons/theme.png')}/>
                        <Text style={[styles.titleText, {color: this.state.mainTextColor}]}>theme</Text>
                    </View>
                    <Pressable style={styles.pressable}
                               android_ripple={{color: '#ddd'}}
                               onPress={() => this.setTheme('light')}>
                        <CheckBox checked={'light' === this.state.themeId} color={this.state.mainTextColor}/>
                        <Text style={[styles.eleText, this.state.themeId==='light' ? selectedEleTextStyle : nonSelectedEleTextStyle]}>
                            light theme
                        </Text>
                    </Pressable>
                    <Pressable style={styles.pressable}
                               android_ripple={{color: '#ddd'}}
                               onPress={() => this.setTheme('dark')}>
                        <CheckBox checked={'dark' === this.state.themeId} color={this.state.mainTextColor}/>
                        <Text style={[styles.eleText, this.state.themeId==='dark' ? selectedEleTextStyle : nonSelectedEleTextStyle]}>
                            dark theme
                        </Text>
                    </Pressable>
                    <Pressable style={styles.pressable}
                               android_ripple={{color: '#ddd'}}
                               onPress={() => this.setTheme('system')}>
                        <CheckBox checked={'system' === this.state.themeId} color={this.state.mainTextColor}/>
                        <Text style={[styles.eleText, this.state.themeId==='system' ? selectedEleTextStyle : nonSelectedEleTextStyle]}>
                            system theme {'(' + getSystemTheme().id + ')'}
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.sectionView, {borderColor: this.state.softBackgroundColor}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={[styles.titleImage, {tintColor: this.state.iconColor}]} source={require('../../../../assets/images/icons/font.png')}/>
                        <Text style={[styles.titleText, {color: this.state.mainTextColor}]}>font</Text>
                    </View>
                    <Pressable style={styles.pressable} android_ripple={{color: '#ddd'}}>
                        <CheckBox checked={true} color={this.state.mainTextColor}/>
                        <Text style={[styles.eleText, selectedEleTextStyle]}>neucha</Text>
                    </Pressable>
                    <Pressable style={styles.pressable} android_ripple={{color: '#ddd'}}>
                        <CheckBox checked={false} color={this.state.mainTextColor}/>
                        <Text style={[styles.eleText, nonSelectedEleTextStyle]}>new font coming soon...</Text>
                    </Pressable>
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
    titleImage: {width: 35, height: 35, marginRight: 10},
    pressable: {flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingHorizontal: WINDOW_WIDTH / 20},
    eleText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 22,
        marginLeft: 10,
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

function mapDispatcherToProps(dispatch) {
    return {
        setTheme: (theme) => dispatch({type: 'THEME', payload: theme}),
    };
}

export default connect(mapStateToProps, mapDispatcherToProps)(AppearanceScreen);
