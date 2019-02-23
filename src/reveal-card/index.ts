import { parseLatLng } from 'util/coordinates';
import { Logger } from 'util/logging';
import { Observer } from 'util/observer';
import { WeatherLink } from './weather-link';
import { hasClass } from 'util/dom';

const logger = new Logger('RevealCard');

const className = {
  CARD: 'widget-reveal-card-open',
  LATLNG: 'widget-reveal-card-lat-lng',
};

let weatherLink: WeatherLink = null;

export function init() {
  new Observer(className.CARD, onInit, onChange);
}

function onInit(element: Element) {
  logger.info('onInit called.');

  const latLngElement = element.getElementsByClassName(className.LATLNG)[0];
  if (!latLngElement) {
    logger.error('Expected a LatLng button!');
    return;
  }

  const coordinates = parseLatLng(latLngElement.textContent);
  weatherLink = new WeatherLink(element, coordinates);
}

function onChange(mutation: MutationRecord) {
  logger.info('onChange called.');

  const target = mutation.target;
  if (mutation.type !== 'characterData' ||
      !hasClass(target.parentNode, className.LATLNG)) {
    return;
  }

  const latLng = parseLatLng(target.textContent);
  if (latLng) {
    weatherLink.setCoordinates(latLng);
  }
}
