import React from 'react';
import {View} from "react-native";
import CustomText from "./CustomText";
import AsyncStorage from "@react-native-community/async-storage";

class RefreshInfo extends React.Component{

    state = {
        dateUpdate: '--:--',
    };

    componentDidMount() {
        this.setLastUpdateTime();
    }

    componentDidUpdate() {
        this.setLastUpdateTime();
    }

    async setLastUpdateTime(){
        const lastUpdate = await AsyncStorage.getItem('@forecast_update_date');
        const date = new Date(JSON.parse(lastUpdate));
        let minutes = date.getMinutes();
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        this.setState({dateUpdate: date.getHours() + ':' + minutes})
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <CustomText style={{fontSize: 13, color: this.props.weatherTheme.textColor}}>
                    Last update {this.state.dateUpdate}
                </CustomText>
            </View>
        )
    }
}

export default RefreshInfo;
