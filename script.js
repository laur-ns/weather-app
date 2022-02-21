async function getWeatherData(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid={API key}`,
    {
      mode: 'cors',
    }
  );
  return await response.json();
}

async function appendWeatherInfo(weatherData) {}
