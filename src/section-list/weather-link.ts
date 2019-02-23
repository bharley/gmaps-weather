import { createAndAttach } from 'util/jss';
import { Logger } from 'util/logging';
import { openLatLng } from 'util/noaa';
import { latLngFromLocation } from 'util/coordinates';

const logger = new Logger('SectionList.WeatherLink');
const SVG_URL = chrome.runtime.getURL('img/noaa.svg');
const SIZE = 24;

const classes = createAndAttach({
  icon: {
    backgroundImage: `url(${SVG_URL})`,
    backgroundSize: `${SIZE}px`,
    height: `${SIZE}px`,
    width: `${SIZE}px`,
  },
});

export class WeatherLink {
  public element: HTMLDivElement;

  constructor(renderAfter: Node) {
    this.element = document.createElement('div');
    this.element.classList.add('section-info', 'section-info-hoverable');
    this.element.appendChild(createInfoNode());
    this.element.addEventListener('click', (ev) => this.onClick(ev));
    this.insertAfter(renderAfter);
  }

  onClick(ev: MouseEvent) {
    const coordinates = latLngFromLocation();
    if (!coordinates) {
      logger.warn('No coordinates to get weather for!');
      return;
    }
    openLatLng(coordinates);
  }

  isInTree(ancestor: Node): boolean {
    return ancestor.contains(this.element);
  }

  insertAfter(renderAfter: Node) {
    renderAfter.parentNode.insertBefore(this.element, renderAfter.nextSibling);
  }

  cleanUp() {
    if (this.element) {
      this.element.remove();
    }
    this.element = null;
  }
}

function createInfoNode(): HTMLElement {
  const infoLine = document.createElement('div');
  infoLine.classList.add('section-info-line', 'section-info-hoverable');
  infoLine.appendChild(createIconNode());
  infoLine.appendChild(createTextNode());
  return infoLine;
}

function createIconNode(): HTMLElement {
  const icon = document.createElement('span');
  icon.classList.add('section-info-icon', classes.icon);
  return icon;
}

function createTextNode(): HTMLElement {
  const text = document.createElement('span');
  text.classList.add('section-info-text');
  text.appendChild(document.createTextNode('Weather'));
  return text;
}
