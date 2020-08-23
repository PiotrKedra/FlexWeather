

const searchForLocationsByQuery = async  (query) => {
    //todo parse here location so it is easy to handle them later
    const URL = 'http://photon.komoot.de/api/?lang=en&osm_tag=:city&osm_tag=:village';
    const query_param = '&q=' + query;
    const response = await fetch(URL + query_param);
    const json = await response.json();
    return json.features;
};

export {searchForLocationsByQuery};
