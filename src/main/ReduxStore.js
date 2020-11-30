import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'redux';

const LAST_FORECAST_UPDATE_STORAGE = '@forecast_update_date';
const ACTIVE_LOCATION_STORAGE = '@active_location';
const LAST_FORECAST_STORAGE = '@last_forecast';
const WEATHER_UNITS_SETTINGS = '@weather_units';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_LOCATION':
      return {...state, activeLocation: action.payload};
    case 'ROOT_FORECAST':
      if (action.payload.saveToStorage) {
        try {
          AsyncStorage.setItem(LAST_FORECAST_UPDATE_STORAGE, JSON.stringify(new Date()));
          AsyncStorage.setItem(ACTIVE_LOCATION_STORAGE, JSON.stringify(action.payload.location));
          AsyncStorage.setItem(LAST_FORECAST_STORAGE, JSON.stringify(action.payload.forecast));
        } catch (e) {
          console.log(e);
        }
      }
      return {
        ...state,
        currentForecast: action.payload.forecast.current,
        activeLocation: action.payload.location,
        rootForecastPerDay: action.payload.forecast.daily,
        hourlyForecast: action.payload.forecast.hourly,
        weatherTheme: action.payload.weatherTheme,
      };
    case 'FORECAST_REFRESH':
      try {
        AsyncStorage.setItem(LAST_FORECAST_UPDATE_STORAGE, JSON.stringify(new Date()));
        AsyncStorage.setItem(LAST_FORECAST_STORAGE, JSON.stringify(action.payload.forecast));
      } catch (e) {
        console.log(e);
      }
      return {
        ...state,
        currentForecast: action.payload.forecast.current,
        rootForecastPerDay: action.payload.forecast.daily,
        hourlyForecast: action.payload.forecast.hourly,
        weatherTheme: action.payload.weatherTheme,
      };
    case 'THEME':
      return {...state, theme: action.payload};
    case 'WEATHER_UNITS':
      try {
        AsyncStorage.setItem(WEATHER_UNITS_SETTINGS, JSON.stringify(action.payload));
      } catch (e) {
        console.log(e);
      }
      return {...state, weatherUnits: action.payload};
    default:
      return {...state};
  }
};

const store = createStore(reducer);

export default store;
