import React from 'react';
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";

import Text from '../../components/CustomText';
import NonDataList from "./NonDataList";
import DetailsList from "./DetailsList";

const TodayDetailPanel = ({forecast, theme}) => {

    return (
        <View style={[styles.tab, {backgroundColor: theme.mainColor}]}>
            <Text style={[styles.mainTitleText, {color: theme.mainText}]}>Precise forecast</Text>
            <Text style={[styles.descriptionText, {color: theme.softText}]}>
                More details
            </Text>
            {
                forecast === undefined ?
                    <NonDataList rows={5}/>
                    :
                    <DetailsList/>
            }
        </View>
    )
};



const styles = StyleSheet.create({
    tab: {
        marginTop: 10,
        width: '95%',
        backgroundColor: '#EEE',
        borderRadius: 20,
    },
    mainTitleText: {
        fontSize: 30,
        paddingLeft: '5%',
        marginTop: 10,
    },
    descriptionText: {
        fontSize: 18,
        paddingLeft: '5%'
    },
});

function mapStateToProps(state) {
    return {
        forecast: state.currentForecast,
        theme: state.theme
    }
}

export default connect(mapStateToProps)(TodayDetailPanel);


