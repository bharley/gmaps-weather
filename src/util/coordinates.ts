import { Logger } from './logging';

const logger = new Logger('Coordinates');

export interface LatLng {
  lat: number;
  lng: number;
}

const LAT_LNG_MATCHER = /@(-?[\d.]+),(-?[\d.]+)/;

export function parseLatLng(str: string): LatLng {
  if (!str || typeof str !== 'string') {
    return null;
  }
  const parts = str.split(',').map(part => part.trim());
  if (parts.length !== 2) {
    logger.warn('Not a lat,lng pair!', str);
    return null;
  }
  return { lat: parseFloat(parts[0]), lng: parseFloat(parts[1]) };
}

export function latLngFromCenterLocation(): LatLng {
  const parts = LAT_LNG_MATCHER.exec(window.location.pathname);
  if (!parts) {
    return null;
  }
  const [, latStr, lngStr] = parts;

  const lat = floatOrNull(latStr);
  const lng = floatOrNull(lngStr);
  return maybeLatLng(lat, lng);
}

export function latLngFromLocation(): LatLng {
  const href = window.location.href;
  const parts = href.split('!').reverse();
  const latStr = parts.find(str => str.indexOf('3d') === 0);
  const lngStr = parts.find(str => str.indexOf('4d') === 0);

  const lat = tryParse(latStr);
  const lng = tryParse(lngStr);
  return maybeLatLng(lat, lng);
}

function tryParse(hrefPart: string): number {
  if (!hrefPart) {
    return null;
  }

  return floatOrNull(hrefPart.substring(2));
}

function floatOrNull(str: string): number {
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

function maybeLatLng(lat: number, lng: number): LatLng {
  if (lat === null || lng === null) {
    return null;
  }

  return { lat, lng };
}
