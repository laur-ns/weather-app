const temperatureUnits = 'celsius';

const submitWeatherCoords = function submitCoordsToWeatherAPI(coords) {
  const lonCoords = coords.split(',')[0];
  const latCoords = coords.split(',')[1];
  console.log(coords);
  console.log(lonCoords);
  console.log(latCoords);
};

export default submitWeatherCoords;
