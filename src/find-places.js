async function findPlaces(searchText) {
  /* Will search up to 5 places using mapbox geocoding api.
  Searches countries, cities, regions, and postcodes.
  The function returns the place name, and the coordinates
  for each place. */
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?limit=5&autocomplete=true&types=country,place,address,region,postcode&access_token=pk.eyJ1IjoibGF1ci1ucyIsImEiOiJja3p6M3V2cjUwNmcyM2JtbHQydzA3NzdoIn0.qAES-URoq1Fe63KU3eCMmQ`,
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
