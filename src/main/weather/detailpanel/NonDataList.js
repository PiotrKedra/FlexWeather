import React, {Fragment} from "react";
import {StyleSheet, View} from "react-native";

const NonDataList = () => {
    const five = [...Array(5).keys()];
    return (
        <Fragment>
            {five.map(i => row(i))}
        </Fragment>
    )
}

const row = (i) => {
    return (
        <Fragment key={i}>
            <View style={styles.itemRow}>
                <View style={styles.elementInRow}>
                    <View style={styles.image}/>
                    <View style={styles.textView}>
                        <View style={styles.textValue}/>
                        <View style={styles.textTitle}/>
                    </View>
                </View>
                <View style={styles.elementInRow}>
                    <View style={styles.image}/>
                    <View style={styles.textView}>
                        <View style={styles.textValue}/>
                        <View style={styles.textTitle}/>
                    </View>
                </View>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        paddingLeft: '5%',
        marginVertical: 20
    },
    elementInRow: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 45,
        height: 45,
        backgroundColor: 'rgba(1,1,1,0.1)'
    },
    textView: {
        paddingLeft: 10,
        flexShrink: 1
    },
    textValue: {height: 25, width: 100, backgroundColor: 'rgba(1,1,1,0.1)', marginVertical: 3},
    textTitle: {height: 22, width: 100, backgroundColor: 'rgba(1,1,1,0.1)', marginVertical: 3},
});

export default NonDataList;
