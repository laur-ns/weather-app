const temperatureUnits = 'celsius';

const submitCoords = function submitCoordsToWeatherAPI(coords) {
  const xCoords = coords.split(',')[0];
  const yCoords = coords.split(',')[1];
  console.log(xCoords);
  console.log(yCoords);
};

export default submitCoords;
