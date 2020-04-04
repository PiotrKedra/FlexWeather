import {FORECAST_ICONS} from "../../../../resource/ImagePath";

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

function mapDataToIcon(iconText) {
    const iconEntity = MAPPER.find(item => item.name === iconText);
    return iconEntity === undefined ? MAPPER[0].icon : iconEntity.icon;
}

export default mapDataToIcon;

