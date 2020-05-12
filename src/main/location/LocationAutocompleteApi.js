

const searchForLocations = async (query, lat, lon) => {
    const url = buildUrl(query, lat, lon);
    const response = await fetch(url);
    const json = await response.json();
    return json.features;
};

function buildUrl(query, lat, lon){
    const URL = 'http://photon.komoot.de/api/?lang=en&osm_tag=:city&osm_tag=:village';
    const query_param = '&q=' + query;
    const lat_param = '&lat=' + lat;
    const lon_param = '&lon=' + lon;
    return URL + query_param + lat_param + lon_param;
}

export default searchForLocations;
