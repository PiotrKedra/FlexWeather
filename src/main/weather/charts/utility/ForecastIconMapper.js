import {FORECAST_ICONS, NEW_API} from "../../../../resource/ImagePath";

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
    {name: '01d', icon: NEW_API.clearDay},
    {name: '02d', icon: NEW_API.fewClouds},
    {name: '03d', icon: NEW_API.clouds},
    {name: '04d', icon: NEW_API.brokenClouds},
    {name: '09d', icon: NEW_API.rain},
    {name: '10d', icon: NEW_API.sunRain},
    {name: '11d', icon: NEW_API.thunderstorm},
    {name: '13d', icon: NEW_API.snow},
    {name: '50d', icon: NEW_API.fog},
];

const NIGHT_MAPPER = [
    {name: '01d', icon: NEW_API.clearNight},
    {name: '02d', icon: NEW_API.fewCloudsNight},
    {name: '03d', icon: NEW_API.clouds},
    {name: '04d', icon: NEW_API.brokenClouds},
    {name: '09d', icon: NEW_API.rain},
    {name: '10d', icon: NEW_API.nightRain},
    {name: '11d', icon: NEW_API.thunderstorm},
    {name: '13d', icon: NEW_API.snow},
    {name: '50d', icon: NEW_API.fog},
];

function mapToDayIcon(icon) {
    const iconEntity = DAY_MAPPER.find(item => item.name === icon);
    return iconEntity === undefined ? DAY_MAPPER[1].icon : iconEntity.icon;
}

function mapToNightIcon(icon) {
    const iconEntity = NIGHT_MAPPER.find(item => item.name === icon);
    return iconEntity === undefined ? NIGHT_MAPPER[1].icon : iconEntity.icon;
}

function mapDataToIcon(iconText) {
    const iconEntity = MAPPER.find(item => item.name === iconText);
    return iconEntity === undefined ? MAPPER[0].icon : iconEntity.icon;
}

export {mapToDayIcon, mapToNightIcon};

export default mapDataToIcon;

