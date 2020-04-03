import {FORECAST_ART} from "../../resource/ImagePath";

const MAPPER = [
    {name: 'default', icon: FORECAST_ART.partlyCloudyDay},
    {name: 'clear-day', icon: FORECAST_ART.clearDay},
    {name: 'clear-night', icon: FORECAST_ART.clearNight},
    {name: 'cloudy', icon: FORECAST_ART.cloudy},
    {name: 'fog', icon: FORECAST_ART.fog},
    {name: 'partly-cloudy-day', icon: FORECAST_ART.partlyCloudyDay},
    {name: 'partly-cloudy-night', icon: FORECAST_ART.partlyCloudyNight},
    {name: 'rain', icon: FORECAST_ART.rain},
    {name: 'sleet', icon: FORECAST_ART.sleet},
    {name: 'snow', icon: FORECAST_ART.snow},
    {name: 'wind', icon: FORECAST_ART.wind},
];

function mapDataToImage(iconText) {
    const iconEntity = MAPPER.find(item => item.name === iconText);
    return iconEntity === undefined ? MAPPER[0].icon : iconEntity.icon;
}

export default mapDataToImage;

