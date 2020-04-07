import React from 'react';
import {TouchableOpacity, View, Image, Animated} from "react-native";

import CustomText from "../../../components/CustomText";
import {DETAIL_ICONS} from "../../../../resource/ImagePath";

const COLORS = {
    uvLow: '#81F04C',
    uvModerate: '#F0AA40',
    uvHigh: '#E77A3D',
    uvVeryHigh: '#EB3737',
    uvExtreme: '#EB40E4',
};

class UVIndexLegend extends React.PureComponent {

    state = {
        isLegend: false,
        viewHeight: new Animated.Value(30),
    };

    showOrHideLegend = () => {
        if(this.state.isLegend===false){
            Animated.timing(this.state.viewHeight, {
                toValue: 180,
                duration: 300
            }).start();
            this.setState({isLegend: true})
        } else {
            Animated.timing(this.state.viewHeight, {
                toValue: 30,
                duration: 300
            }).start();
            this.setState({isLegend: false})
        }
    };

    render() {
        const animatedStyle = {
            height: this.state.viewHeight
        };
        return (
            <Animated.View style={[{marginHorizontal: '5%', marginBottom: 10}, animatedStyle]}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={this.showOrHideLegend}>
                    <View style={{marginLeft: 2, borderWidth: 1, borderRadius: 20, width: 21, alignItems: 'center'}}>
                        <Image style={{width: 16, height: 16, marginTop: 2}} source={DETAIL_ICONS.uvIndex}/>
                    </View>
                    <CustomText style={{fontSize: 20, marginLeft: 8}}>
                        UV index legend
                    </CustomText>
                </TouchableOpacity>
                {this.state.isLegend &&
                <View style={{marginLeft: 31}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{height: 20, width: 6, borderRadius: 5, backgroundColor: COLORS.uvLow}}/>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>0-2</CustomText>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>no protection required</CustomText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{height: 20, width: 6, borderRadius: 5, backgroundColor: COLORS.uvModerate}}/>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>3-5</CustomText>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>cover your body with sunglasses and clothes</CustomText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{height: 20, width: 6, borderRadius: 5, backgroundColor: COLORS.uvHigh}}/>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>6-7</CustomText>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>additionally use 30 spf filter</CustomText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{height: 20, width: 6, borderRadius: 5, backgroundColor: COLORS.uvVeryHigh}}/>
                        <CustomText style={{fontSize: 18, marginLeft:5}}>7-10</CustomText>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>use 50 spf filter and stay in the shadows</CustomText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{height: 20, width: 6, borderRadius: 5, backgroundColor: COLORS.uvExtreme}}/>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>+11</CustomText>
                        <CustomText style={{fontSize: 18, marginHorizontal: 5}}>does not occur on Earth</CustomText>
                    </View>
                </View>}
            </Animated.View>
        )
    }
}

export default UVIndexLegend;
