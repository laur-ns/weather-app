import displayResults from './display-results';
import findPlaces from './find-places';

let timeout = null;

export default function handleSearch(search) {
  if (search === '') {
    return;
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const response = findPlaces(search);
    response.then(displayResults);
  }, 500);
}
