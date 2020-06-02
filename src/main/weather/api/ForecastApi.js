import {TOKEN} from "../../token";


export default fetchRootForecast;

async function fetchRootForecast(lat, lng){
    try {
        let response2 = await fetch('http://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+lng+'&appid=299a842c62583504c69d7d27b25e5d96&units=metric');
        let response = await fetch('https://api.darksky.net/forecast/' + TOKEN + '/' + lat + ',' + lng + '?units=si');

        let responseJson2 = await response2.json();
        let responseJson = await response.json();

        //let forecastPerDay = responseJson.daily.data;
        let forecastPerDay = responseJson2.daily;

        let hourlyForecast = getHourlyForecast(responseJson.hourly);

        let dayForecastArray = responseJson.daily.data;
        let days = getDateObjectsList(dayForecastArray);

        return {
            current: responseJson2.current,
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
            precipIntensity: item.precipIntensity,
            precipProbability: parseNumber(item.precipProbability*100),
            temperature: Math.round(item.temperature),
            apparentTemperature: Math.round(item.apparentTemperature),
            dewPoint: item.dewPoint,
            humidity: (item.humidity*100).toFixed(),
            pressure: item.pressure,
            windSpeed: item.windSpeed.toFixed(1),
            windGust: item.windGust,
            windBearing: item.windBearing,
            cloudCover: item.cloudCover,
            uvIndex: item.uvIndex,
            visibility: item.visibility,
            ozone: item.ozone
    }))
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
