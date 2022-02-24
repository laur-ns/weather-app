import handleSearch from './search';

async function main() {
  const searchInput = document.querySelector('.form__text');
  searchInput.addEventListener('input', () => {
    handleSearch(searchInput.value);
  });
}

main();
