import {BACKGORUND} from "../../resource/ImagePath";

const ICON_MAPPER = [
    {name: '02d', background: BACKGORUND.sun, mainColor: '#FCB941', textColor: '#191206', menuColor: '#BFD5FE'},
    {name: '02d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE'},
    {name: '03d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE'},
    {name: '04d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE'},
    {name: '09d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E'},
    {name: '10d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE'},
    {name: '11d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E'},
    {name: '13d', background: BACKGORUND.snow, mainColor: '#8dafe4', textColor: '#0e1116', menuColor: '#E4C28D'},
    {name: '50d', background: BACKGORUND.cloud, mainColor: '#FC6042', textColor: '#190906', menuColor: '#C0F4FE'},
];

const NIGHT_THEME_COLOR = '#23395d';
const NIGHT_MENU_COLOR = '#B98E46';
const NIGHT_TEXT_COLOR = '#e9ebee';

function getThemeEntity(forecast){
    const theme = getTheme(forecast.current);
    return {
        background: theme.background,
        mainColor: theme.mainColor,
        textColor: theme.textColor,
        menuColor: theme.menuColor,
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
            return 'Just few clouds on the sky.';
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
