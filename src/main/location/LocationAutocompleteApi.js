

const searchForLocationsByQuery = async (query) => {
  try {
    const URL = 'http://photon.komoot.de/api/?lang=en&osm_tag=:city&osm_tag=:village';
    const queryParam = '&q=' + query;
    const response = await fetch(URL + queryParam);
    const json = await response.json();
    const locations = json.features;
    locations.forEach((ele, i) => locations[i] = parseLocation(ele));
    return locations;
  } catch (e) {
    alert('ERROR: ' + e);
    return [];
  }
};

function parseLocation(location) {
  return {
    longitude: location.geometry.coordinates[0],
    latitude: location.geometry.coordinates[1],
    city: location.properties.name,
    country: location.properties.country,
  };
}

export {searchForLocationsByQuery};
