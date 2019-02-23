import { Logger } from 'util/logging';
import { Observer } from 'util/observer';
import { WeatherLink } from './weather-link';

const logger = new Logger('VerticalWidget');

const className = {
  HOLDER: 'app-vertical-widget-holder',
};

let weatherLink: WeatherLink = null;

export function init() {
  new Observer(className.HOLDER, onInit, onChange);
}

function onInit(widgetHolder: Element) {
  logger.info('onInit called!');

  weatherLink = new WeatherLink(widgetHolder);
}

function onChange(mutation: MutationRecord) {
  logger.info('onChange called!');
}
