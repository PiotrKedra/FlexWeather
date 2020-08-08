import AsyncStorage from '@react-native-community/async-storage';

const DISTANCE_LIMIT = 5;

async function hasDistanceChanged(location){
    try {
        const storageLocation = await AsyncStorage.getItem('@active_location');
        const distance = calculateDistance(location.latitude, location.longitude, storageLocation.latitude, storageLocation.longitude);
        return distance <= DISTANCE_LIMIT;
    } catch (e){
        return true;
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const pi = 0.017453292519943295; // Math.PI/180
    const cos = Math.cos;
    const a = 0.5 - cos((lat2 - lat1) * pi)/2 +
        cos(lat1 * pi) * cos(lat2 * pi) *
        (1 - cos((lon2 - lon1) * pi))/2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export default hasDistanceChanged;
