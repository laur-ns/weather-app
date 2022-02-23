async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=11ea4e799d422a52dbd686220ca6b1e9`,
      { mode: 'cors' }
    );
    return response.json();
  } catch (e) {
    throw new Error(`Error occurred getting weather data: ${e}`);
  }
}

async function searchPlaces(searchText) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=pk.eyJ1IjoibGF1ci1ucyIsImEiOiJja3p6M3V2cjUwNmcyM2JtbHQydzA3NzdoIn0.qAES-URoq1Fe63KU3eCMmQ`,
      { mode: 'cors' }
    );
    return response.json();
  } catch (e) {
    throw new Error(`Error occurred searching for place: ${e}`);
  }
}

getWeatherData();
