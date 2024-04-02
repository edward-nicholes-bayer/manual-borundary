const toGeoJSON = require('@mapbox/togeojson');
const DOMParser = require('xmldom').DOMParser;

const kml2geojson = (file) => {
  const kml = new DOMParser().parseFromString(file);

  const data = toGeoJSON.kml(kml);

  // Clean zeros
  // {
  //   "type": "FeatureCollection",
  //   "features": [
  //     {
  //       "type": "Feature",
  //       "geometry": {
  //         "type": "Polygon",
  //         "coordinates": [
  //           [
  //             [
  //               -88.041354,
  //               40.52972,
  //               0
  //             ],

  const { coordinates } = data.features[0].geometry;
  data.features[0].geometry.coordinates = coordinates.map(list => {
    return list.map(item => item.slice(0, 2));
  });

  return data;
}

module.exports = { kml2geojson };
