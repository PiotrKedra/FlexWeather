import React from 'react';
import {Image, TouchableOpacity, View, Animated, StyleSheet} from 'react-native';

import Text from '../../components/CustomText';
import IMAGES from "../../../resource/ImagePath";

class LastUpdateInfo extends React.Component {

    state = {
        showInfo: false,
        infoHeight: new Animated.Value(25),
    };

    showOrHideInfo = () => {
        const showInfo = this.state.showInfo;
        if (showInfo === false){
            Animated.timing(this.state.infoHeight, {
                toValue: 90,
                duration: 300
            }).start();
            this.setState({showInfo: true});
        } else {
            Animated.timing(this.state.infoHeight, {
                toValue: 25,
                duration: 300
            }).start();
            this.setState({showInfo: false});
        }
    };

    render() {
        const heightStyle = {
            height: this.state.infoHeight,
        };
        return (
            <Animated.View style={[styles.animatedView, heightStyle]}>
                <TouchableOpacity style={styles.touchableInfo}
                                  onPress={this.showOrHideInfo}>
                    <Image style={styles.image}
                           source={IMAGES.infoIcon}/>
                    <Text style={styles.touchableText}>
                        Last updated ...
                    </Text>
                </TouchableOpacity>
                {this.state.showInfo ?
                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>
                            Last forecast update was at 15:00.
                        </Text>
                        <TouchableOpacity style={styles.touchableRefresh}>
                            <Text style={styles.refreshText}>
                                Refresh
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        marginBottom: 10
    },
    touchableInfo: {
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 25,
        width: 25
    },
    touchableText: {
        fontSize: 15,
        color: 'rgba(33,33,33,0.5)',
        marginHorizontal: 8
    },
    infoView: {
        marginHorizontal: '5%',
        paddingLeft: 33
    },
    infoText: {
        fontSize: 16,
        color: 'rgba(33,33,33,0.5)'
    },
    touchableRefresh: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: 'rgba(33,66,150,0.7)',
        alignSelf: 'flex-start',
        marginTop: 10
    },
    refreshText: {
        fontSize: 20,
        color: 'rgba(33,66,150,0.7)',
        marginHorizontal: 15,
        marginVertical: 2
    },
});

export default LastUpdateInfo;
