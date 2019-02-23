import { LatLng } from 'util/coordinates';
import { createAndAttach } from 'util/jss';
import { Logger } from 'util/logging';
import { openLatLng } from 'util/noaa';

const logger = new Logger('RevealCard.WeatherLink');
const SVG_URL = chrome.runtime.getURL('img/noaa.svg');
const SIZE = 18;

const classes = createAndAttach({
  svg: {
    borderRadius: '50%',
    bottom: '6px',
    cursor: 'pointer',
    height: `${SIZE}px`,
    padding: '6px',
    position: 'absolute',
    right: `${60 + SIZE}px`,
    width: `${SIZE}px`,

    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
});

export class WeatherLink {
  private element: HTMLImageElement;
  private latLng: LatLng;

  constructor(parent: Node, coordinates?: LatLng) {
    this.element = document.createElement('img');
    this.element.src = SVG_URL;
    this.element.classList.add(classes.svg);
    this.element.addEventListener('click', (ev) => this.onClick(ev));
    parent.appendChild(this.element);

    if (coordinates) {
      this.setCoordinates(coordinates);
    }
  }

  onClick(ev: MouseEvent) {
    if (!this.latLng) {
      logger.warn('No coordinates to get weather for!');
      return;
    }

    openLatLng(this.latLng);
  }

  setCoordinates(latLng: LatLng) {
    this.latLng = latLng;
  }

  cleanUp() {
    if (this.element) {
      this.element.remove();
    }
    this.element = null;
  }
}
