import searchInit from './search';
import submitWeatherCoords from './weather';

const getLocation = function promptUserForLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userCoords = `${position.coords.longitude},${position.coords.latitude}`;
      submitWeatherCoords(userCoords);
    },
    () => {
      // error callback
      submitWeatherCoords('174.78333,-36.85');
    }
  );
};

// searchInit();
// getLocation();
