export default function displayPlaces(result) {
  if (!result.length > 0) {
    return;
  }
  result.forEach((r) => {
    console.log(r.placeName);
  });
}