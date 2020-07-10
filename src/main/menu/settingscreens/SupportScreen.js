import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from "react-native";

const SupportScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    return (
        <ScrollView style={styles.mainView}>
            <View style={{marginVertical: 20}}>
                <Text>
                    <Text style={styles.text}>
                        {'Hi! Do you have any problem with the app? Or you just want to say how much you like it? Write to us through the app or by sending mail to '}
                    </Text>
                    <Text style={[styles.text, {textDecorationLine: 'underline'}]}>
                        pkedra.studio@gmail.com
                    </Text>
                    <Text style={styles.text}>.</Text>
                </Text>
            </View>
            <View>
                <Text style={styles.inputTitleText}>your name:*</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    style={styles.textInput}
                />
                <Text style={styles.inputTitleText}>tell us your email if you want receive response:</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    style={styles.textInput}
                />
                <Text style={styles.inputTitleText}>message:*</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                    style={[styles.textInput, {height: SCREEN_WIDTH/3, textAlignVertical: 'top', paddingVertical: 4}]}
                />
                <View style={{width: '100%', alignItems: 'flex-end', marginVertical: 20}}>
                    <TouchableOpacity style={{backgroundColor: '#2C82C9', paddingVertical: 5, paddingHorizontal: 40, borderRadius: 5}}>
                        <Text style={{fontFamily: 'Neucha-Regular', fontSize: 25, color: 'white'}}>send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#eee',
        paddingHorizontal: SCREEN_WIDTH/10
    },
    text: {
        fontFamily: 'Neucha-Regular',
        fontSize: 22
    },
    inputTitleText: {
        fontFamily: 'Neucha-Regular',
        fontSize: 20,
        color: '#444',
        marginTop: 10,
        marginBottom: 5,
    },
    textInput: {
        fontFamily: 'Neucha-Regular',
        fontSize: 18,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 0,
        borderRadius: 5
    }
});

export default SupportScreen;
