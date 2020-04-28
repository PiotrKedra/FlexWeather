import React, {useState} from "react";
import {Image, TouchableOpacity, View, ScrollView, StyleSheet, Animated} from "react-native";
import CustomText from "../components/CustomText";

class MenuListItem extends React.PureComponent {

    state = {
        height: new Animated.Value(30),
        opacity: new Animated.Value(0),
    };

    showOrHideSettings() {
        const visibility = this.props.visibility;
        Animated.timing(this.state.height, {
            toValue: visibility ? 30 : 30 + 30 * this.props.quantityOfSettings,
            duration: 300
        }).start();
        Animated.timing(this.state.opacity, {
            toValue: visibility ? 0 : 1,
            duration: 500
        }).start();
        this.props.setVisibility(!visibility);
    }

    render() {
        const animatedStyle = {
            height: this.state.height,
        };
        const settingsOpacity = {
            opacity: this.state.opacity
        };
        return (
            <Animated.View style={[styles.menuEle, animatedStyle]}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => this.showOrHideSettings()}>
                    <Image style={{height: 30, width: 30}} source={this.props.image}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>{this.props.title}</CustomText>
                </TouchableOpacity>
                {this.props.visibility ?
                    <Animated.View style={settingsOpacity}>
                        {this.props.settingsComponent}
                    </Animated.View>
                    : null
                }
            </Animated.View>
        )
    }
}

const MenuList = () => {
    const [isWeatherView, setIsWeatherView] = useState(false);
    const [isHomeLocation, setIsHomeLocation] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    return (
        <ScrollView>
            <MenuListItem visibility={isWeatherView}
                          setVisibility={setIsWeatherView}
                          image={require('../../../assets/images/icons/change.png')}
                          title={'Weather view'}
                          settingsComponent={<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>}
                          quantityOfSettings={1}
            />
            <View style={styles.menuEle}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => setIsHomeLocation(!isHomeLocation)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/home.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Home location</CustomText>
                </TouchableOpacity>
                {isHomeLocation ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
            <View style={styles.menuEle}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => setIsNotification(!isNotification)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/notification.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Notification</CustomText>
                </TouchableOpacity>
                {isNotification ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
            <View style={styles.menuEle}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => setIsNotification(!isNotification)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/language.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Language</CustomText>
                </TouchableOpacity>
                {isNotification ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
            <View style={styles.menuEle}>
                <TouchableOpacity style={styles.menuEleText} onPress={() => setIsNotification(!isNotification)}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icons/bug.png')}/>
                    <CustomText style={{fontSize: 25, marginHorizontal: 10}}>Report a bug</CustomText>
                </TouchableOpacity>
                {isNotification ? (<View style={{marginTop: 10, borderBottomWidth: 1}}><CustomText style={{fontSize: 23, marginLeft: 40, color: '#222'}}>Zabierzów</CustomText></View>): null}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    menuEle: {
        marginVertical: 7,
        paddingHorizontal: 20
    },
    menuEleText: {
        flexDirection: 'row'
    }
});

export default MenuList;
