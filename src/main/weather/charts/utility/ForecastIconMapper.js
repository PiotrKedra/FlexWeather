import {FORECAST_ICONS, FORECAST_ICONS2, NEW_API} from "../../../../resource/ImagePath";

const MAPPER = [
    {name: 'default', icon: FORECAST_ICONS.partlyCloudyDay},
    {name: 'clear-day', icon: FORECAST_ICONS.clearDay},
    {name: 'clear-night', icon: FORECAST_ICONS.clearNight},
    {name: 'cloudy', icon: FORECAST_ICONS.cloudy},
    {name: 'fog', icon: FORECAST_ICONS.fog},
    {name: 'partly-cloudy-day', icon: FORECAST_ICONS.partlyCloudyDay},
    {name: 'partly-cloudy-night', icon: FORECAST_ICONS.partlyCloudyNight},
    {name: 'rain', icon: FORECAST_ICONS.rain},
    {name: 'sleet', icon: FORECAST_ICONS.sleet},
    {name: 'snow', icon: FORECAST_ICONS.snow},
    {name: 'wind', icon: FORECAST_ICONS.wind},
];

const DAY_MAPPER = [
    {name: '01d', icon: FORECAST_ICONS2.clearDay},
    {name: '02d', icon: FORECAST_ICONS2.fewClouds},
    {name: '03d', icon: FORECAST_ICONS2.clouds},
    {name: '04d', icon: FORECAST_ICONS2.brokenClouds},
    {name: '09d', icon: FORECAST_ICONS2.rain},
    {name: '10d', icon: FORECAST_ICONS2.sunRain},
    {name: '11d', icon: FORECAST_ICONS2.thunderstorm},
    {name: '13d', icon: FORECAST_ICONS2.snow},
    {name: '50d', icon: FORECAST_ICONS2.fog},
];

const NIGHT_MAPPER = [
    {name: '01d', icon: FORECAST_ICONS2.clearNight},
    {name: '02d', icon: FORECAST_ICONS2.fewCloudsNight},
    {name: '03d', icon: FORECAST_ICONS2.clouds},
    {name: '04d', icon: FORECAST_ICONS2.brokenClouds},
    {name: '09d', icon: FORECAST_ICONS2.rain},
    {name: '10d', icon: FORECAST_ICONS2.nightRain},
    {name: '11d', icon: FORECAST_ICONS2.thunderstorm},
    {name: '13d', icon: FORECAST_ICONS2.snow},
    {name: '50d', icon: FORECAST_ICONS2.fog},
];

const HOURLY_ICON_MAPPER = [
    {name: '01d', icon: FORECAST_ICONS2.clearDay},
    {name: '02d', icon: FORECAST_ICONS2.fewClouds},
    {name: '03d', icon: FORECAST_ICONS2.clouds},
    {name: '04d', icon: FORECAST_ICONS2.brokenClouds},
    {name: '09d', icon: FORECAST_ICONS2.rain},
    {name: '10d', icon: FORECAST_ICONS2.sunRain},
    {name: '11d', icon: FORECAST_ICONS2.thunderstorm},
    {name: '13d', icon: FORECAST_ICONS2.snow},
    {name: '50d', icon: FORECAST_ICONS2.fog},
    {name: '01n', icon: FORECAST_ICONS2.clearNight},
    {name: '02n', icon: FORECAST_ICONS2.fewCloudsNight},
    {name: '03n', icon: FORECAST_ICONS2.clouds},
    {name: '04n', icon: FORECAST_ICONS2.brokenClouds},
    {name: '09n', icon: FORECAST_ICONS2.rain},
    {name: '10n', icon: FORECAST_ICONS2.nightRain},
    {name: '11n', icon: FORECAST_ICONS2.nightThunderstorm},
    {name: '13n', icon: FORECAST_ICONS2.nightSnow},
    {name: '50n', icon: FORECAST_ICONS2.nightFog},
];

function mapToHourlyIcon(icon){
    const iconEntity = HOURLY_ICON_MAPPER.find(item => item.name === icon);
    return iconEntity === undefined ? HOURLY_ICON_MAPPER[1].icon : iconEntity.icon;
}

function mapToDayIcon(icon, rain) {
    if(icon === '10d' && rain <= 3){
        return DAY_MAPPER[3].icon;
    }
    const iconEntity = DAY_MAPPER.find(item => item.name === icon);
    return iconEntity === undefined ? DAY_MAPPER[1].icon : iconEntity.icon;
}

function mapToNightIcon(icon, rain) {
    if(icon === '10d' && rain <= 2.5){
        return NIGHT_MAPPER[3].icon;
    }
    const iconEntity = NIGHT_MAPPER.find(item => item.name === icon);
    return iconEntity === undefined ? NIGHT_MAPPER[1].icon : iconEntity.icon;
}

function mapDataToIcon(iconText) {
    const iconEntity = MAPPER.find(item => item.name === iconText);
    return iconEntity === undefined ? MAPPER[0].icon : iconEntity.icon;
}

export {mapToDayIcon, mapToNightIcon, mapToHourlyIcon};

export default mapDataToIcon;

