import AsyncStorage from "@react-native-community/async-storage";

import {CELSIUS, HECTOPASCAL, KILOMETERS_PER_HOUR, METERS} from "./UnitsValues";

const DEFAULT_UNITS = {
    temp: CELSIUS,
    wind: KILOMETERS_PER_HOUR,
    pressure: HECTOPASCAL,
    visibility: METERS,
}

const getTempValue = (value, unit) => {
    if(unit===CELSIUS)
        return Math.round(value);
    return Math.round((value * 1.8) + 32); // celsius to fahrenheit formula
}

export {
    DEFAULT_UNITS,
    getTempValue,
}
