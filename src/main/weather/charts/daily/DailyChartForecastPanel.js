import React, {Fragment, Suspense,useState} from "react";
import CustomText from "../../../components/CustomText";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import AnimatedChartText from "../utility/AnimatedChartText";
import ChartLoading from "../utility/ChartLoading";
import DailyChartService from "./DailyChartService";
import {connect} from "react-redux";

const DailyChartForecastPanel = ({theme, weatherTheme, weatherUnits}) => {

    const [currentChart, setCurrentChart] = useState('general');
    const chartNotSelectedStyle = {backgroundColor: theme.softColor};

    return (
        <Fragment>
            <CustomText style={[styles.title, {color: theme.mainText}]}>
                Daily forecast
            </CustomText>
            <CustomText style={[styles.subtitle, {color: theme.softText}]}>
                For next 7 days
            </CustomText>
            <ScrollView style={styles.selectionView}
                        horizontal={true}>
                <TouchableOpacity style={[styles.chartSelectionButton, (currentChart==='general') ? {backgroundColor: weatherTheme.mainColor} : chartNotSelectedStyle]}
                                  onPress={() => setCurrentChart('general')}>
                    <AnimatedChartText selected={currentChart==='general'} title={'general'} unit={weatherUnits.temp} selectedTextColor={weatherTheme.textColor} textColor={theme.mainText}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.chartSelectionButton, (currentChart==='wind') ? {backgroundColor: weatherTheme.mainColor} : chartNotSelectedStyle]}
                                  onPress={() => setCurrentChart('wind')}>
                    <AnimatedChartText selected={currentChart==='wind'} title={'wind'} unit={weatherUnits.wind}  selectedTextColor={weatherTheme.textColor} textColor={theme.mainText}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.chartSelectionButton, (currentChart==='rainfall') ? {backgroundColor: weatherTheme.mainColor} : chartNotSelectedStyle]}
                                  onPress={() => setCurrentChart('rainfall')}>
                    <AnimatedChartText selected={currentChart==='rainfall'} title={'rainfall'} unit={'mm'} selectedTextColor={weatherTheme.textColor} textColor={theme.mainText}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.chartSelectionButton, (currentChart==='uv_index') ? {backgroundColor: weatherTheme.mainColor} : chartNotSelectedStyle, {marginRight: 30}]}
                                  onPress={() => setCurrentChart('uv_index')}>
                    <AnimatedChartText selected={currentChart==='uv_index'} title={'uv index'} unit={'-'} selectedTextColor={weatherTheme.textColor} textColor={theme.mainText}/>
                </TouchableOpacity>
            </ScrollView>
            <Suspense fallback={<ChartLoading/>}>
                <DailyChartService currentChart={currentChart}/>
            </Suspense>
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
    selectionView: {
        paddingLeft: '5%',
        borderBottomWidth: 1,
        borderColor: 'rgba(66,66,66,0.5)',
        paddingVertical: 10,
    },
    chartSelectionButton: {
        borderRadius: 15,
        elevation: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        opacity: 0.8
    },
});


function mapStateToProps(state){
    return {
        theme: state.theme,
        weatherTheme: state.weatherTheme,
        weatherUnits: state.weatherUnits
    }
}

export default connect(mapStateToProps)(DailyChartForecastPanel);
