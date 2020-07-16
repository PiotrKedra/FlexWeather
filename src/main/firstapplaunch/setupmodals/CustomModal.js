import React from "react";
import {View} from "react-native";
import Modal from "react-native-modal";
import GeneralStatusBar from "../../components/GeneralStatusBar";

const CustomModal = (props) => {

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => props.setVisible(false)}
            backdropOpacity={0.4}
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            style={{margin: 0}}>
            <GeneralStatusBar opacity={0}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '80%', backgroundColor: props.mainColor, borderRadius: 2, padding: '5%'}}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
};

export default CustomModal;
