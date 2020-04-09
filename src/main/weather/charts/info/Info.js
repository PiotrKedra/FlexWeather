import React from 'react';
import {Image, TouchableOpacity, Animated} from 'react-native';
import Text from '../../../components/CustomText';

class Info extends React.PureComponent {

    state = {
        showInfo: false,
        infoHeight: new Animated.Value(25),
    };

    showOrHideInfo = () => {
        const showInfo = this.state.showInfo;
        if (showInfo === false){
            Animated.timing(this.state.infoHeight, {
                toValue: 50,
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
            <Animated.View style={[{marginBottom: 10}, heightStyle]}>
                <TouchableOpacity style={{ paddingHorizontal: '5%', flexDirection: 'row', alignItems: 'center'}}
                                  onPress={this.showOrHideInfo}>
                    <Image style={{height: 25, width: 25}} source={require('../../../../../assets/images/info.png')}/>
                    <Text style={{fontSize: 15, color: 'rgba(33,33,33,0.5)', marginHorizontal: 8}}>
                        Info
                    </Text>
                </TouchableOpacity>
                {this.state.showInfo ?
                    <Text style={{fontSize: 16, color: 'rgba(33,33,33,0.5)', marginLeft: '5%', paddingLeft: 33}}>
                        Hour by hour forecast is only for next 48h.
                    </Text>
                    : null
                }
            </Animated.View>
        )
    }
}

export default Info;
