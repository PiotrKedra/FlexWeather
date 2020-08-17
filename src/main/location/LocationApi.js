const getLocationDetails = async (longitude, latitude) => {
    try {
        const url = 'http://photon.komoot.de/reverse?lon=' + longitude + '&lat=' + latitude + '&lang=en';
        const response = await fetch(url);
        const locationDetails = await response.json();
        return {
            longitude: longitude,
            latitude: latitude,
            city: locationDetails.features[0].properties.city,
            country: locationDetails.features[0].properties.country,
        };
    } catch (e){
        alert('ERROR: ' + e);
        return {
            longitude: longitude,
            latitude: latitude,
            city: 'undefined',
            country: 'undefined',
        };
    }
};

export default getLocationDetails;
