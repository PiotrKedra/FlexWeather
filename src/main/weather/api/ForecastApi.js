import foo from './Dupa';
import {ToastAndroid} from 'react-native';

export default fetchRootForecast;

async function fetchRootForecast(lat, lng) {
  try {
    const apiUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat=';
    const response =
      await fetch(apiUrl + lat + '&lon='+lng+'&appid=' + foo(a) + '&units=metric');
    const responseJson = await response.json();
    return {
      current: responseJson.current,
      daily: responseJson.daily,
      hourly: responseJson.hourly,
    };
  } catch (error) {
    ToastAndroid.show('Couldn\'t load forecast', ToastAndroid.SHORT);
    return {};
  }
}

const a = 'OWZhNjhjMDgzZjI0MjkyOGM0MWNmZWEzNDU3MDk5NTA=';
