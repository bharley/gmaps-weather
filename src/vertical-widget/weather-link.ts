import { Logger } from 'util/logging';
import { createAndAttach } from 'util/jss';
import { latLngFromCenterLocation } from 'util/coordinates';
import { openLatLng } from 'util/noaa';

const logger = new Logger('VerticalWidget.WeatherLink');

const SVG_URL = chrome.runtime.getURL('img/noaa.svg');
const SIZE = 29;

const classes = createAndAttach({
  container: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: '2px',
    cursor: 'pointer',
    height: `${SIZE}px`,
    marginBottom: '4px',
  },
  '@global': {
    '.app-imagery-mode': {
      '& $container': {
        backgroundColor: '#222',
      },
    },
  },
  svg: {
    boxSizing: 'border-box',
    height: `${SIZE}px`,
    opacity: '0.8',
    padding: '3px',
    width: `${SIZE}px`,

    '&:hover': {
      opacity: '1',
    },
  },
});

export class WeatherLink {
  private button: Element = null;

  constructor(parent: Element) {
    this.button = createContainer();
    this.button.addEventListener('click', () => this.onClick());
    parent.prepend(this.button);
  }

  private onClick() {
    const coordinates = latLngFromCenterLocation();
    if (!coordinates) {
      logger.error('No location to open!');
      return;
    }

    openLatLng(coordinates);
  }
}

function createContainer(): Element {
  const container = document.createElement('div');
  container.classList.add('app-vertical-item', classes.container);
  container.appendChild(createSvg());
  return container;
}

function createSvg(): Element {
  const svg = document.createElement('img');
  svg.classList.add(classes.svg);
  svg.src = SVG_URL;
  return svg;
}
