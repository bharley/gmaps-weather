import { LatLng } from './coordinates';

export function getUrl({ lat, lng }: LatLng): string {
  return `https://forecast.weather.gov/MapClick.php?lon=${lng}&lat=${lat}`;
}

export function openLatLng(latLng: LatLng) {
  const noaaUrl = getUrl(latLng);
  window.open(noaaUrl);
}
