let currentLocation = null;

const setCurrentLocation = (location) => {
  currentLocation = location;
  return currentLocation;
};

const getCurrentLocation = () => currentLocation;

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

export default getCurrentLocation;
export { setCurrentLocation, getPosition };
