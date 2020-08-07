function getSummary(forecast){
    if(forecast.current === undefined)
        return 'undefined';
    const main = forecast.current.weather[0].main;
    const description = forecast.current.weather[0].description;
    switch(main) {
        case 'Thunderstorm':
            return handleThunderstormDescription(description);
        case 'Drizzle':
            return 'Don\'t you worry, it\'s only a drizzle.';
        case 'Rain':
            return handleRainDescription(description);
        case 'Snow':
            return 'Outside the snow began to fall.';
        case 'Clear':
            return 'Clear sky for you guys.';
        case 'Clouds':
            return handleCloudsDescription(description);
        default:
            return 'Something is happening! ' + main + '.';
    }
}

function handleThunderstormDescription(description){
    switch(description){
        case 'thunderstorm with rain':
            return 'Raining, thunderstorm and what else...?';
        case 'thunderstorm':
            return 'There could be some lighting.';
        case 'heavy thunderstorm':
            return 'Be careful, heavy thunderstorm out there.';
        case 'ragged thunderstorm':
            return 'Zeus is very angry!';
        case 'thunderstorm with drizzle':
            return 'Thunderstorm and some drizzle.';
        default:
            return 'There could be some lighting.';
    }
}

function handleRainDescription(description) {
    switch (description) {
        case 'light rain':
            return 'It may rain a little bit.';
        case 'moderate rain':
            return 'It may rain a little bit.';
        case 'heavy intensity rain':
            return 'Lots of raining, unfortunately.';
        case 'very heavy rain':
            return 'Lots of raining, unfortunately.';
        case 'extreme rain':
            return 'Lots of raining, unfortunately.';
        case 'freezing rain':
            return 'Freezing rain, better get and umbrella.';
        case 'light intensity shower rain':
            return 'It may rain a little bit.';
        case 'shower rain':
            return 'It may rain a little bit.';
        case 'heavy intensity shower rain':
            return 'Lots of raining, unfortunately.';
        case 'ragged shower rain':
            return 'Poseidon really drank too much.';
        default:
    }
}

function handleCloudsDescription(description){
    switch (description){
        case 'few clouds':
            return 'Just few clouds on the sky.';
        case 'scattered clouds':
            return 'Boring. Only clouds.';
        case 'broken clouds':
            return 'May looks like it\'s about to rain.';
        case 'overcast clouds':
            return 'Lots of clouds around you.';
        default:
            return 'Just few clouds on the sky.';
    }
}

export default getSummary;
