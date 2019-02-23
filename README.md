# Gmaps Weather

**Disclaimer:** This extension is not affiliated with Google Maps, Google LLC, or NOAA.

This extension adds links to forecasts from NOAA in two locations:
  1. The "What's here?" dialog that is triggered via the context menu.
  2. An icon about the scale buttons on the right.

The first link will pull up the forecast for the location indicated in the widget. The second
link will pull up the forecast for the center of the map.

## Development

  1. Download the repository.
  2. Install the dependencies (`npm install`).
  3. Run the watch command (`npm run watch`).
  4. Load the unpacked extension (outputs to `./build`) in Chrome.
  5. Hack away!

Running `npm run build` runs webpack in production and creates the bundled `./dist/extension.zip` file.
