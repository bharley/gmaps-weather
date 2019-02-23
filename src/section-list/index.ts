import { Logger } from 'util/logging';
import { Observer } from 'util/observer';
import { WeatherLink } from './weather-link';

const logger = new Logger('SectionList');

const className = {
  WIDGET_PANE: 'widget-pane',
  SECTION_INFO: 'section-info',
};

let widgetRoot: Element = null;
let weatherLink: WeatherLink = null;

export function init() {
  new Observer(className.WIDGET_PANE, onInit, onChange);
}

function onInit(element: Element) {
  logger.info('onInit called.');

  widgetRoot = element;
  tryInitWeatherLink();
}

function onChange(mutation: MutationRecord) {
  logger.info('onChange called.');

  if (!weatherLink) {
    tryInitWeatherLink();
    return;
  }

  if (!weatherLink.isInTree(widgetRoot)) {
    const lastInfoElement = getLastInfoElement();
    if (lastInfoElement) {
      weatherLink.insertAfter(lastInfoElement);
    }
  }
}

function tryInitWeatherLink() {
  const lastInfoElement = getLastInfoElement();
  if (lastInfoElement) {
    initWeatherLink(lastInfoElement);
  }
}

function initWeatherLink(lastInfoElement: Element) {
  weatherLink = new WeatherLink(lastInfoElement);
}

function getLastInfoElement(): Element {
  const infoElements =
    widgetRoot.getElementsByClassName(className.SECTION_INFO);
  if (infoElements.length > 0) {
    return infoElements[infoElements.length - 1];
  }

  return null;
}
