import {TOKEN} from "../../token";


export default fetchRootForecast;

async function fetchRootForecast(lat, lng){
    try {
        let response = await fetch('https://api.darksky.net/forecast/' + TOKEN + '/' + lat + ',' + lng + '?units=si');
        let responseJson = await response.json();

        let forecastPerDay = parseToForecastPerDay(responseJson);

        let hourlyForecast = getHourlyForecast(responseJson.hourly);

        let dayForecastArray = responseJson.daily.data;
        let days = getDateObjectsList(dayForecastArray);

        return {
            rootForecast: forecastPerDay,
            currentTimestamp: responseJson.currently.time,
            days: days,
            hourlyForecast: hourlyForecast,
        }
    } catch (error) {
        console.log(error);
    }
}

function getHourlyForecast(hourly) {
    return hourly.data.map(item => ({
            time: getHourFromUnixTime(item.time),
            timeObject: convertUnixTime(item.time),
            summary: item.summary,
            icon: item.icon,
            precipIntensity: item.precipIntensity,
            precipProbability: item.precipProbability*100 + '%',
            temperature: Math.round(item.temperature),
            apparentTemperature: Math.round(item.apparentTemperature),
            dewPoint: item.dewPoint,
            humidity: item.humidity,
            pressure: item.pressure,
            windSpeed: item.windSpeed,
            windGust: item.windGust,
            windBearing: item.windBearing,
            cloudCover: item.cloudCover,
            uvIndex: item.uvIndex,
            visibility: item.visibility,
            ozone: item.ozone
    }))
}

function parseToForecastPerDay(forecast){
    let dailyForecastArray = forecast.daily.data;

    let forecastArray = [];
    for(let dayForecast of dailyForecastArray){
        let dailyForecast = {
            temperature: parseNumber((dayForecast.temperatureMin + dayForecast.temperatureMax)/2),
            temperatureMin: parseNumber(dayForecast.temperatureMin),
            temperatureMax: parseNumber(dayForecast.temperatureMax),
            icon: dayForecast.icon,
            summary: dayForecast.summary,
            timestamp: dayForecast.time
        };
        forecastArray.push(dailyForecast);
    }
    forecastArray[0].temperature = forecast.currently.temperature;
    return forecastArray;
}

function parseNumber(number){
    return (Math.round(number * 100)/100).toFixed(1);
}

function getDateObjectsList(dayForecastArray){
    let days = [];
    for (let dayForecast of dayForecastArray){
        let dateObject = convertUnixTime(dayForecast.time);
        days.push(dateObject);
    }
    return days;
}

function getHourFromUnixTime(unixTimestamp) {
    let date = new Date(unixTimestamp * 1000);
    return date.getHours() + ':00';
}

function convertUnixTime(unixTimestamp){
    let date = new Date(unixTimestamp * 1000);
    let days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    return {
        timestamp: unixTimestamp,
        date: date.getDate(),
        day: days[date.getDay()]
    }
}
