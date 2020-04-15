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
            currentTimestamp: forecastPerDay[0].timestamp,
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
            precipIntensity: item.precipIntensity.toFixed(),
            precipProbability: parseNumber(item.precipProbability*100),
            temperature: Math.round(item.temperature),
            apparentTemperature: Math.round(item.apparentTemperature),
            dewPoint: item.dewPoint,
            humidity: (item.humidity*100).toFixed(),
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
            apparentTemperatureMin: parseNumber(dayForecast.apparentTemperatureMin),
            apparentTemperatureMax: parseNumber(dayForecast.apparentTemperatureMax),
            icon: dayForecast.icon,
            summary: dayForecast.summary,
            timestamp: dayForecast.time,
            sunriseTime: dayForecast.sunriseTime,
            sunsetTime: dayForecast.sunsetTime,
            moonPhase: dayForecast.moonPhase,
            precipIntensity: dayForecast.precipIntensity,
            precipProbability: parseNumber(dayForecast.precipProbability) + '%',
            dewPoint: dayForecast.dewPoint,
            humidity: parseNumber(dayForecast.humidity*100),
            pressure: dayForecast.pressure,
            windSpeed: dayForecast.windSpeed,
            windGust: dayForecast.windGust,
            windBearing: dayForecast.windBearing,
            cloudCover: parseNumber(dayForecast.cloudCover*100),
            uvIndex: dayForecast.uvIndex,
            visibility: parseNumber(dayForecast.visibility),
            ozone: dayForecast.ozone,

        };
        forecastArray.push(dailyForecast);
    }
    forecastArray[0].temperature = parseNumber(forecast.currently.temperature);
    return forecastArray;
}

function parseNumber(number){
    return (Math.round(number)).toFixed(0);
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
    let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return {
        timestamp: unixTimestamp,
        date: date.getDate(),
        day: days[date.getDay()]
    }
}
