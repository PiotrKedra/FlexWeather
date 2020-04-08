import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Image, Animated, StyleSheet} from "react-native";

import CustomText from "../../../components/CustomText";
import {DETAIL_ICONS} from "../../../../resource/ImagePath";
import {UV_COLORS} from "../common/ChartColors";

const UvIndexLegend = () => {
    const [isLegend, setIsLegend] = useState(false);
    const animation = useAnimation(isLegend);
    return (
        <Animated.View style={[styles.rootView, {height: animation.height}]}>
            <TouchableOpacity style={styles.touchableLegend}
                              onPress={() => setIsLegend(!isLegend)}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                           source={DETAIL_ICONS.uvIndex}/>
                </View>
                <CustomText style={styles.touchableText}>
                    UV index legend
                </CustomText>
            </TouchableOpacity>
            {isLegend &&
            <Animated.View style={{opacity: animation.opacity}}>
                {getLegendItem()}
            </Animated.View>}
        </Animated.View>
    )
};

const useAnimation = (isLegend) => {
    const [height, setHeight] = useState(new Animated.Value(30));
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.parallel([
            Animated.timing(height, {
                toValue: isLegend ? 180 : 30,
                duration: 300
            }),
            Animated.timing(opacity, {
                toValue: isLegend ? 1 : 0,
                duration: 400
            })
        ]).start();
    }, [isLegend]);
    return {
        height: height,
        opacity: opacity
    };
};

const legendObjects = [
    {range: '0-2  ', info: 'no protection required', color: UV_COLORS.uvLow},
    {range: '3-5  ', info: 'cover your body with sunglasses and clothes', color: UV_COLORS.uvModerate},
    {range: '6-7  ', info: 'additionally use 30 spf filter', color: UV_COLORS.uvHigh},
    {range: '8-10', info: 'use 50 spf filter and stay in the shadows', color: UV_COLORS.uvVeryHigh},
    {range: '+11  ', info: 'does not occur on Earth', color: UV_COLORS.uvExtreme},
];

function getLegendItem(){
    return legendObjects.map(item => (
        <View key={item.range}
              style={styles.legendItemContainer}>
            <View style={[styles.legendItemColor, {backgroundColor: item.color}]}/>
            <CustomText style={styles.legendItemText}>
                {item.range}
            </CustomText>
            <CustomText style={styles.legendItemText}>
                {item.info}
            </CustomText>
        </View>))
}

const styles = StyleSheet.create({
    rootView: {
        marginHorizontal: '5%',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(66,66,66,0.3)'
    },
    touchableLegend: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        marginLeft: 2,
        borderWidth: 1,
        borderRadius: 20,
        width: 21,
        alignItems: 'center',
        borderColor: '#444'
    },
    image: {
        width: 16,
        height: 16,
        marginTop: 2
    },
    touchableText: {
        fontSize: 20,
        marginLeft: 8,
        color: '#444'
    },
    legendItemContainer: {
        flexDirection: 'row',
        marginLeft: 31
    },
    legendItemColor: {
        height: 20,
        width: 6,
        borderRadius: 5
    },
    legendItemText: {
        fontSize: 18,
        marginHorizontal: 5,
        color: '#444'
    },
});

export default UvIndexLegend;
