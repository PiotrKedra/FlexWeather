import {Appearance} from "react-native";

function getLightTheme(){
    return {
        id: 'light',
        mainColor: '#eee',
        softColor: '#ccc',
        mainText: '#111',
        softText: '#777',
        backgroundColor: '#eee',
        softBackgroundColor: '#bbb',
    }
}

function getDarkTheme(){
    return {
        id: 'dark',
        mainColor: '#222',
        softColor: '#444',
        mainText: '#ccc',
        softText: '#777',
        backgroundColor: '#333',
        softBackgroundColor: '#555',
    }
}

function getSystemTheme() {
    const scheme = Appearance.getColorScheme();
    if (scheme === 'dark')
        return getDarkTheme();
    return getLightTheme();
}

export {getLightTheme, getDarkTheme, getSystemTheme};
