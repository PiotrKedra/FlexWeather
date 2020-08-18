import React, {Fragment} from "react";
import {StyleSheet} from 'react-native';
import CustomText from "../../../components/CustomText";
import {connect} from "react-redux";
import NonDataList from "../../detailpanel/NonDataList";
import MainDetailsList from "./MainDetailsList";
import RefreshInfo from "../../../components/RefreshInfo";

const MainDetailsPanel = ({currentForecast, theme}) => {
    return (
        <Fragment>
            <RefreshInfo/>
            <CustomText style={[styles.title, {color: theme.mainText}]}>
                Today forecast
            </CustomText>
            <CustomText style={[styles.subtitle, {color: theme.softText}]}>
                Details
            </CustomText>
            {
                currentForecast === undefined ?
                    <NonDataList rows={2}/>
                    :
                    <MainDetailsList/>
            }
        </Fragment>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingLeft: '5%',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
        paddingLeft: '5%'
    },
})

function mapStateToProps(state){
    return {
        currentForecast: state.currentForecast,
        theme: state.theme
    }
}

export default connect(mapStateToProps)(MainDetailsPanel);
