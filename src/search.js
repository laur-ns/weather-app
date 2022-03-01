import displayPlaces from './display-places';
import findPlaces from './find-places';
import submitWeatherCoords from './weather';

let timeout = null;

const handleSearch = function searchAfterTimeoutRunsOut(search) {
  /* Will keep restarting search after a delay
  Takes list of places from findPlaces,
  Then passes that list as argument to displayPlaces */
  if (search === '') {
    return;
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const response = findPlaces(search);
    response.then(displayPlaces).catch((e) => console.log(e));
  }, 300);
};

export default function searchInit() {
  const searchInput = document.querySelector('.form__search');
  const searchForm = document.querySelector('.form');
  const resultsElement = document.querySelector('.form__results');
  searchInput.addEventListener('input', () => {
    handleSearch(searchInput.value);
  });
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (resultsElement.innerHTML === '') {
      return;
    }
    const closestLocation = document.querySelector('.form__results > li');
    submitWeatherCoords(closestLocation.getAttribute('id'));
    searchInput.value = closestLocation.textContent;
    resultsElement.innerHTML = '';
  });
}

export { handleSearch };
