import { add, format } from 'date-fns';
import { getWeatherApiKey } from './api-keys';
import getCurrentLocation from './location';

const key = getWeatherApiKey();
let activeForecast = 0;
let temperatureUnit = 'C';
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

const forecastWeatherIcons = {
  Clear: './assets/SVG/clear.svg',
  Clouds: './assets/SVG/clouds.svg',
  Drizzle: './assets/SVG/rain.svg',
  Rain: './assets/SVG/heavy-rain.svg',
  Thunderstorm: './assets/SVG/thunder.svg',
  Snow: './assets/SVG/snow.svg',
  Atmosphere: './assets/SVG/scattered-clouds.svg',
};

const convertKelvinToCurrentUnit = (kTemp) => {
  if (temperatureUnit === 'C') {
    return Math.round(kTemp - 273.25);
  }
  // return fahrenheit
  return Math.round(((kTemp - 273.15) * 9) / 5 + 32);
};

const getCurrentUnit = () => {
  if (temperatureUnit === 'C') {
    return 'C';
  }
  return 'F';
};

const setCurrentUnit = (u) => {
  if (u !== 'C' && u !== 'F') {
    throw new Error('something went wrong...');
  }
  temperatureUnit = u;
};

const appendMainCurrent = function displayWeatherDataForMainCurrent(data) {
  const currentTemp = convertKelvinToCurrentUnit(data.current.temp);
  const todayDayMonth = format(new Date(), 'do MMMM');
  let weatherCondition = data.current.weather[0].main;

  const todayTempElem = document.querySelector('.today__temperature-value');
  const todayDateElem = document.querySelector('.today__date');
  const todayLocationElem = document.querySelector('.today__location');
  const todayImgElem = document.querySelector('.today__main-img');

  todayTempElem.textContent = `${currentTemp}°`;
  todayDateElem.textContent = todayDayMonth;
  todayLocationElem.textContent = getCurrentLocation();
  // use generic icon if there is no set image for weather
  if (mainWeatherIcons[weatherCondition] === undefined) {
    weatherCondition = 'Atmosphere';
  }
  todayImgElem.setAttribute('src', mainWeatherIcons[weatherCondition]);
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
    `${convertKelvinToCurrentUnit(
      dayInfo.feels_like.day
    )} °${getCurrentUnit()}`,
    `${Math.round(dayInfo.humidity)}%`,
    `${Math.round(dayInfo.pop * 100)}%`,
  ];

  const detailsElements = document.querySelectorAll('.selected-day__value');
  let i = 0;
  detailsElements.forEach((e) => {
    e.textContent = detailsToAppend[i];
    i += 1;
  });
};

const appendWeekForecasts = (forecasts) => {
  const currentDate = new Date();
  const forecastElements = document.querySelectorAll('.day');
  let i = 0;
  forecastElements.forEach((e) => {
    const elementDate = add(currentDate, { days: i });
    const weatherCondition = forecasts[i].weather[0].main;

    const dayOfWeek = e.querySelector('.day__week');
    const dayAndMonth = e.querySelector('.day__date');
    const weatherDesc = e.querySelector('.day__weather');
    const weatherIcon = e.querySelector('.day__icon');
    const maxTemp = e.querySelector('.day__max-temp');
    const minTemp = e.querySelector('.day__min-temp');

    dayOfWeek.textContent = format(elementDate, 'EEE');
    dayAndMonth.textContent = format(elementDate, 'd MMMM');
    weatherDesc.textContent = weatherCondition;
    weatherIcon.setAttribute('src', forecastWeatherIcons[weatherCondition]);
    maxTemp.textContent = `${convertKelvinToCurrentUnit(
      forecasts[i].temp.max
    )} °${getCurrentUnit()}`;
    minTemp.textContent = `${convertKelvinToCurrentUnit(
      forecasts[i].temp.min
    )} °${getCurrentUnit()}`;
    i += 1;
  });
};

async function getWeatherData(lon, lat) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}`
  );
  weatherData = await response.json();
  return weatherData;
}

const changeActiveDay = (e) => {
  const currentActiveDay = document.querySelector('.day--active');
  const dayNumber = Number(e.classList[1].split('--')[1]);
  activeForecast = dayNumber;
  appendMainDetails(weatherData, dayNumber);
  currentActiveDay.classList.toggle('day--active');
  e.classList.toggle('day--active');
};

const displayWeatherData = (data) => {
  appendMainCurrent(data);
  appendMainDetails(data, activeForecast);
  appendWeekForecasts(data.daily);
};

const toggleUnits = () => {
  if (getCurrentUnit() === 'C') {
    setCurrentUnit('F');
    displayWeatherData(weatherData);
  } else {
    setCurrentUnit('C');
    displayWeatherData(weatherData);
  }
};

const weatherInit = function initializeDocumentEventListeners() {
  const tempCToggle = document.querySelector('.today__c');
  const tempFToggle = document.querySelector('.today__f');
  const days = document.querySelectorAll('.day');

  tempCToggle.addEventListener('click', (e) => {
    if (tempCToggle.classList.contains('active')) {
      return;
    }
    toggleUnits(e);
    tempCToggle.classList.toggle('active');
    tempFToggle.classList.toggle('active');
  });
  tempFToggle.addEventListener('click', (e) => {
    if (tempFToggle.classList.contains('active')) {
      return;
    }
    toggleUnits(e);
    tempCToggle.classList.toggle('active');
    tempFToggle.classList.toggle('active');
  });
  days.forEach((e) => {
    e.addEventListener('click', () => {
      if (e.classList.contains('day--active')) {
        return;
      }
      changeActiveDay(e);
    });
  });
};

const submitWeatherCoords = async function submitCoordsToWeatherAPI(coords) {
  const lonCoords = coords.split(',')[0];
  const latCoords = coords.split(',')[1];
  await getWeatherData(lonCoords, latCoords)
    .then(displayWeatherData)
    .catch((e) => console.log(e));
  const currentDay = document.querySelector('.day');
  activeForecast = 0;
  changeActiveDay(currentDay);
};

export default submitWeatherCoords;
export { weatherInit };
