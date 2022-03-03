import getWeatherApiKey from './weather-api-key';

const temperatureUnits = 'celsius';
const key = getWeatherApiKey();

async function getWeatherData(lon, lat) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}`
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

const submitWeatherCoords = function submitCoordsToWeatherAPI(coords) {
  const lonCoords = coords.split(',')[0];
  const latCoords = coords.split(',')[1];
  console.log(lonCoords);
  console.log(latCoords);
  getWeatherData(lonCoords, latCoords);
};

export default submitWeatherCoords;
