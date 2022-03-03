import submitWeatherCoords from './weather';

const searchInput = document.querySelector('.form__search');
const resultsElement = document.querySelector('.form__results');
const listItem = document.createElement('li');

export default function displayPlaces(result) {
  resultsElement.innerHTML = '';
  if (!result.length > 0) {
    return;
  }
  result.forEach((r) => {
    const place = listItem.cloneNode();
    place.textContent = r.placeName;
    place.setAttribute('id', r.coords);
    place.setAttribute('tabindex', '0');
    place.addEventListener('click', () => {
      searchInput.value = r.placeName;
      resultsElement.innerHTML = '';
      submitWeatherCoords(place.getAttribute('id'));
    });
    place.addEventListener('keydown', (e) => {
      if (e.keyCode !== 13) {
        return;
      }
      searchInput.value = r.placeName;
      resultsElement.innerHTML = '';
      submitWeatherCoords(place.getAttribute('id'));
    });

    resultsElement.append(place);
  });
}
