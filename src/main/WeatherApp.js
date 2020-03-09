import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Text, View} from "react-native";

import MainPage from "./MainPage";
import fetchRootForecast from "./weather/api/ForecastApi"




class WeatherApp extends React.Component {

    state = {
        isRootForecastLoaded: false,
        store: undefined
    };

    async componentDidMount() {
        let rootForecast = await fetchRootForecast();
        this.setState({
            isRootForecastLoaded: true,
            store: this.prepareStore(rootForecast)
        });
    }

    prepareStore(rootForecast){
        const initialState = {
            forecastViewType: 'DAY',
            rootForecastPerDay: rootForecast.rootForecast,
            currentTimestamp: rootForecast.currentTimestamp,
            days: rootForecast.days
        };
        const reducer = (state = initialState, action) => {
            switch (action.type) {
                case 'CURRENT_TIMESTAMP':
                    return Object.assign({}, state, {
                        currentTimestamp: action.payload
                    });
                case 'ELSE':
                    return state;
            }
            return state;
        };
        return createStore(reducer);
    }

    render() {
        return (this.state.isRootForecastLoaded ?
                    <Provider store={this.state.store}>
                        <MainPage/>
                    </Provider>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25}}>Data not loaded</Text>
                    </View>
                )
    }
}

export default WeatherApp;
