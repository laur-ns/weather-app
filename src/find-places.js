import { getMapApiKey } from './api-keys';

const key = getMapApiKey();

async function getPlaceFromCoords(coords) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?types=place&access_token=${key}`,
      { mode: 'cors' }
    );
    const responseObject = await response.json();
    return responseObject.features[0].place_name;
  } catch (e) {
    throw new Error(e);
  }
}

async function findPlaces(searchText) {
  /* Will find up to 5 places using mapbox geocoding api.
  Fins countries, cities, regions, and postcodes.
  The function returns the place name, and the coordinates
  for each place. */
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?limit=5&autocomplete=true&types=country,place,address,region,postcode&access_token=${key}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    const searchResults = [];
    weatherData.features.forEach((e) => {
      searchResults.push({
        placeName: e.place_name,
        coords: e.center,
      });
    });
    return searchResults;
  } catch (e) {
    throw new Error('An error occured searching for a place.');
  }
}

export default findPlaces;
export { getPlaceFromCoords };
