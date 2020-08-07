import {BACKGORUND} from "../../resource/ImagePath";
import getSummary from "./SummaryService";

const ICON_MAPPER = [
    {name: '01d', background: BACKGORUND.sun, mainColor: '#FCB941', textColor: '#191206', menuColor: '#BFD5FE', panelColor: '#EEE'},
    {name: '02d', background: BACKGORUND.cloud, mainColor: '#f97a78', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '03d', background: BACKGORUND.cloud, mainColor: '#f97a78', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '04d', background: BACKGORUND.cloud, mainColor: '#f97a78', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
    {name: '09d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E', panelColor: '#EEE'},
    {name: '10d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E', panelColor: '#EEE'},
    {name: '11d', background: BACKGORUND.rain, mainColor: '#2C82C9', textColor: '#040d14', menuColor: '#E6B68E', panelColor: '#EEE'},
    {name: '13d', background: BACKGORUND.snow, mainColor: '#8dafe4', textColor: '#0e1116', menuColor: '#E4C28D', panelColor: '#EEE'},
    {name: '50d', background: BACKGORUND.cloud, mainColor: '#f97a78', textColor: '#190906', menuColor: '#C0F4FE', panelColor: '#EEE'},
];

const NIGHT_THEME_COLOR = '#000000';
const NIGHT_MENU_COLOR = '#653760';
const NIGHT_TEXT_COLOR = '#EEE';
const NIGHT_PANEL_COLOR = '#ccc';

function getThemeEntity(forecast){
    console.log(forecast)
    const theme = getTheme(forecast.current);
    return {
        background: theme.background,
        mainColor: theme.mainColor,
        textColor: theme.textColor,
        menuColor: theme.menuColor,
        panelColor: theme.panelColor,
        summary: getSummary(forecast),
    };
}

function getTheme(current){
    if(current === undefined){
        console.log('no theme (no forecast)')
        return ICON_MAPPER[0];
    }
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

export default getThemeEntity;
