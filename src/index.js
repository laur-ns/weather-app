async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=11ea4e799d422a52dbd686220ca6b1e9`,
      { mode: 'cors' }
    );
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} \n Try a different search string`
      );
    }
    return response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function searchPlaces(searchText) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?limit=5&autocomplete=true&types=country,place,address,region,postcode&access_token=pk.eyJ1IjoibGF1ci1ucyIsImEiOiJja3p6M3V2cjUwNmcyM2JtbHQydzA3NzdoIn0.qAES-URoq1Fe63KU3eCMmQ`,
      { mode: 'cors' }
    );
    console.log(await response.json());
    return response.json();
  } catch (e) {
    throw new Error('An error occured searching for a place.');
  }
}

searchPlaces('palmerston');
