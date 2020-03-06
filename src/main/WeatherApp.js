import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";

import MainPage from "./MainPage";

const initialState = {
    forecastViewType: 'DAY'
};

const reducer = (state = initialState) => {
    return state;
};

const store = createStore(reducer);

class WeatherApp extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <MainPage/>
            </Provider>
        )
    }
}

export default WeatherApp;
