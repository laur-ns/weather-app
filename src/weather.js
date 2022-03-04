import { add, format } from 'date-fns';
import { getWeatherApiKey } from './api-keys';
import getCurrentLocation from './location';

const temperatureUnit = 'celsius';
const key = getWeatherApiKey();
let weatherData;
const mainWeatherIcons = {
  Clear: './assets/SVG/main-clear.svg',
  Clouds: './assets/SVG/main-few-clouds.svg',
  Drizzle: './assets/SVG/main-rain.svg',
  Rain: './assets/SVG/main-rain.svg',
  Thunderstorm: './assets/SVG/main-thunder.svg',
  Snow: './assets/SVG/main-snow.svg',
  Atmosphere: './assets/SVG/scattered-clouds.svg',
};

const convertKelvinToCurrentUnit = (kTemp) => {
  if (temperatureUnit === 'celsius') {
    return Math.round(kTemp - 273.25);
  }
  // return fahrenheit
  return Math.round(((kTemp - 273.15) * 9) / 5 + 32);
};

const appendMainCurrent = function displayWeatherDataForMainCurrent(data) {
  const currentTemp = convertKelvinToCurrentUnit(data.current.temp);
  const todayDayMonth = format(new Date(), 'do MMMM');

  const todayTempElem = document.querySelector('.today__temperature-value');
  const todayDateElem = document.querySelector('.today__date');
  const todayLocationElem = document.querySelector('.today__location');
  const todayImgElem = document.querySelector('.today__main-img');

  todayTempElem.textContent = `${currentTemp}°`;
  todayDateElem.textContent = todayDayMonth;
  todayLocationElem.textContent = getCurrentLocation();
  todayImgElem.setAttribute(
    'src',
    mainWeatherIcons[data.current.weather[0].main]
  );
};

const appendMainDetails = (data, index) => {
  // set selected date
  const selectedDate = add(new Date(), { days: index });
  const dayOfWeek = format(selectedDate, 'EEEE');
  const dayAndMonth = format(selectedDate, 'd MMMM');
  const selectedDateElem = document.querySelector('.selected-day__date');
  selectedDateElem.textContent = `${dayOfWeek} | ${dayAndMonth}`;

  // set the main values
  const dayInfo = data.daily[index];
  const detailsToAppend = [
    `${dayInfo.wind_speed}m/s`,
    `${convertKelvinToCurrentUnit(dayInfo.feels_like.day)}°`,
    `${dayInfo.humidity}%`,
    `${dayInfo.pop * 100}%`,
  ];

  const detailsElements = document.querySelectorAll('.selected-day__value');
  let i = 0;
  detailsElements.forEach((e) => {
    e.textContent = detailsToAppend[i];
    i += 1;
  });
};

const displayWeatherData = (data) => {
  appendMainCurrent(data);
  appendMainDetails(data, 0);
  console.log(data);
};

async function getWeatherData(lon, lat) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}`
  );
  weatherData = await response.json();
  return weatherData;
}

const submitWeatherCoords = function submitCoordsToWeatherAPI(coords) {
  const lonCoords = coords.split(',')[0];
  const latCoords = coords.split(',')[1];
  getWeatherData(lonCoords, latCoords)
    .then(displayWeatherData)
    .catch((e) => console.log(e));
};

export default submitWeatherCoords;
