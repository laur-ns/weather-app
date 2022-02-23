import findPlaces from './find-places';

async function main() {
  const places = await findPlaces('palmerston');
  places.forEach((e) => {
    console.log(e.placeName);
  });
}

main();
