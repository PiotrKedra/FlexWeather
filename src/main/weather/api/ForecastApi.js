import TOKEN from "../../token";


export default fetchRootForecast;

async function fetchRootForecast(){
    try {
        let response = await fetch('https://api.darksky.net/forecast/' + TOKEN + '/50.1102653,19.7615527?units=si');
        let responseJson = await response.json();

        let forecastPerDay = parseToForecastPerDay(responseJson);

        let dayForecastArray = responseJson.daily.data;
        let days = getDateObjectsList(dayForecastArray);

        return {
            rootForecast: forecastPerDay,
            currentTimestamp: forecastPerDay[0].timestamp,
            days: days
        }
    } catch (error) {
        console.log(error);
    }
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

function convertUnixTime(unixTimestamp){
    let date = new Date(unixTimestamp * 1000);
    let days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    return {
        timestamp: unixTimestamp,
        date: date.getDate(),
        day: days[date.getDay()]
    }
}
