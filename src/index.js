import { getPlaceFromCoords } from './find-places';
import { getPosition, setCurrentLocation } from './location';
import searchInit from './search';
import submitWeatherCoords from './weather';

const submitInitLocation = async function promptUserForLocation() {
  // submits and displays weather data using either user's location,
  // or a default location if user refuses
  let userCoords;
  await getPosition()
    .then((p) => {
      userCoords = `${p.coords.longitude},${p.coords.latitude}`;
    })
    .catch(() => {
      userCoords = '174.78333,-36.85';
    });
  const userLocation = await getPlaceFromCoords(userCoords);
  setCurrentLocation(userLocation);
  submitWeatherCoords(userCoords);
};

searchInit();
submitInitLocation();
