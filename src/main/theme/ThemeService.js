import {BACKGORUND} from "../../resource/ImagePath";

const ICON_MAPPER = [
    {name: '01d', background: BACKGORUND.sun, mainColor: '#FCB941', textColor: '#191206', menuColor: '#BFD5FE', panelColor: '#EEE'},
    {name: '02d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '03d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '04d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '09d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E', panelColor: '#EEE'},
    {name: '10d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '11d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E', panelColor: '#EEE'},
    {name: '13d', background: BACKGORUND.snow, mainColor: '#8dafe4', textColor: '#0e1116', menuColor: '#E4C28D', panelColor: '#EEE'},
    {name: '50d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
];

const NIGHT_THEME_COLOR = '#23395d';
const NIGHT_MENU_COLOR = '#B98E46';
const NIGHT_TEXT_COLOR = '#ccc';
const NIGHT_PANEL_COLOR = '#ccc';

function getThemeEntity(forecast){
    const theme = getTheme(forecast.current);
    return {
        background: theme.background,
        mainColor: theme.mainColor,
        textColor: theme.textColor,
        menuColor: theme.menuColor,
        panelColor: theme.panelColor,
        summary: getSummary(forecast.current.weather[0].description),
    };
}

function getTheme(current){
    if(new Date() < new Date(current.sunrise*1000) || new Date(current.sunset*1000) < new Date()){
        return {
            background: BACKGORUND.night,
            mainColor: NIGHT_THEME_COLOR,
            textColor: NIGHT_TEXT_COLOR,
            menuColor: NIGHT_MENU_COLOR,
            panelColor: NIGHT_PANEL_COLOR,
        };
    }
    const icon = current.weather[0].icon;
    const theme = ICON_MAPPER.find(i => i.name === icon);
    return theme === undefined ? ICON_MAPPER[0] : theme;
}

function getSummary(description){
    switch (description) {
        case 'clear sky':
            return 'Clear sky for you guys.';
        case 'few clouds':
            return 'Just few clouds on the sky.(' + description + ')';
        case 'scattered clouds':
            return 'Boring. Only clouds.';
        case 'broken clouds':
            return 'May looks like it\'s about to rain.';
        case 'shower rain':
            return 'It may rain a little bit.';
        case 'rain':
            return 'Rain, rain and rain.';
        case 'thunderstorm':
            return 'There could be some lighting.';
        case 'snow':
            return 'Outside the snow began to fall.';
        default:
            return 'Hard to say. Few clouds? (' + description + ')';
    }
}

export default getThemeEntity;
