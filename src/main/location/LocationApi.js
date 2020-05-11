
const getLocationDetails = async (longitude, latitude) => {
    const url = 'http://photon.komoot.de/reverse?lon=' + longitude + '&lat=' + latitude + '&lang=en';
    const response = await fetch(url);
    const locationDetails = await response.json();
    const location = {
        longitude: longitude,
        latitude: latitude,
        city: locationDetails.features[0].properties.city,
        country: locationDetails.features[0].properties.country,
    };
};

export default getLocationDetails;
