import React, {useState} from "react";
import {TouchableOpacity, StyleSheet, View, Animated} from "react-native";
import CustomText from "../../components/CustomText";
import MenuListItem from "./MenuListItem";
import Switch from "./comon/Switch";

const NotificationsSettings = () => {
    const [isNotifications, setIsNotifications] = useState(false);

    return (
        <MenuListItem visibility={isNotifications}
                      setVisibility={setIsNotifications}
                      image={require('../../../../assets/images/icons/notification.png')}
                      title={'Notifications'}
                      settingsComponent={<NotificationsSettingsComponent/>}
                      quantityOfSettings={2}
        />
    )
};

const NotificationsSettingsComponent = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(true);

    return (
        <View style={styles.mainView}>
            <View style={styles.notificationSetting}>
                <CustomText style={styles.notificationSettingText}>
                    Daily notifications
                </CustomText>
                <Switch isEnabled={isEnabled} setIsEnabled={setIsEnabled}/>
            </View>
            <View style={styles.notificationSetting}>
                <CustomText style={styles.notificationSettingText}>
                    Alert notifications
                </CustomText>
                <Switch isEnabled={isEnabled2} setIsEnabled={setIsEnabled2}/>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
    },
    notificationSetting: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 1,
    },
    notificationSettingText: {
        flex: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 23,
        color: '#222',
        backgroundColor: 'rgba(250,250,250,0.3)',
        marginRight: 10
    }
});

export default NotificationsSettings;
