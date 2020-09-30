import {
    BEAUFORT_SCALE,
    CELSIUS, FAHRENHEIT,
    HECTOPASCAL, KILOMETERS,
    KILOMETERS_PER_HOUR, KNOT,
    METERS, MILES,
    MILES_PER_HOUR,
    MILLIBARS
} from "./UnitsValues";

const DEFAULT_UNITS = {
    temp: CELSIUS,
    wind: KILOMETERS_PER_HOUR,
    pressure: HECTOPASCAL,
    visibility: METERS,
}

const getTempValue = (value, unit) => {
    if(unit===FAHRENHEIT)
        return Math.round((value * 1.8) + 32); // celsius to fahrenheit formula
    return Math.round(value);
}

const getWindValue = (value, unit) => {
    if(unit===KILOMETERS_PER_HOUR)
        return Math.round((value*36))/10; // m/s to km/h formula
    else if(unit===MILES_PER_HOUR)
        return Math.round(value*22.369)/10; // m/s to MPH formula
    else if(unit===KNOT)
        return Math.round(value*19.438)/10; // m/s to knot formula
    else if(unit===BEAUFORT_SCALE)
        return Math.round(((value*1.9438) + 10.0)/6.0) // m/s to beaufort scale formula -> it is not optimal (it doesn't show 0,1 scale)
    return Math.round(value*10)/10;
}

const getPressureValue = (value, unit) => {
    if(unit===MILLIBARS)
        return value;
    return value;
}

const getVisibilityValue = (value, unit) => {
    if(unit===KILOMETERS)
        return Math.round(value/1000); // m to km formula
    else if(unit===MILES)
        return Math.round(value*0.000621371192);  // m to mi formula
    return value;
}

export {
    DEFAULT_UNITS,
    getTempValue,
    getWindValue,
    getPressureValue,
    getVisibilityValue
}
