import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const THEME_STORAGE = '@theme';

async function getStorageTheme() {
  try {
    const value = await AsyncStorage.getItem(THEME_STORAGE);
    switch (value) {
      case 'light':
        return getLightTheme();
      case 'dark':
        return getDarkTheme();
      default:
        return getSystemTheme();
    }
  } catch (e) {
    return getSystemTheme();
  }
}

function getLightTheme() {
  return {
    id: 'light',
    mainColor: '#eee',
    softColor: '#ccc',
    mainText: '#111',
    iconColor: '#333',
    softText: '#777',
    backgroundColor: '#eee',
    softBackgroundColor: '#bbb',
  };
}

function getDarkTheme() {
  return {
    id: 'dark',
    mainColor: '#222',
    softColor: '#444',
    mainText: '#ccc',
    iconColor: '#999',
    softText: '#777',
    backgroundColor: '#333',
    softBackgroundColor: '#555',
  };
}

function getSystemTheme() {
  const scheme = Appearance.getColorScheme();
  if (scheme === 'dark') {
    return getDarkTheme();
  }
  return getLightTheme();
}

export {getLightTheme, getDarkTheme, getSystemTheme};

export default getStorageTheme;
