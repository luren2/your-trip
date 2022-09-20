export function formatCity(city) {
  let location = '';
  for (let c of city) {
    if (c !== '市') {
      location += c;
    }
  }
  return location;
}
