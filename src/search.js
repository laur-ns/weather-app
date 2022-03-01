import displayPlaces from './display-places';
import findPlaces from './find-places';

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
  }, 500);
};

export default function searchInit() {
  const searchInput = document.querySelector('.form__text');
  const searchForm = document.querySelector('.form');
  searchInput.addEventListener('input', () => {
    handleSearch(searchInput.value);
  });
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

export { handleSearch };
