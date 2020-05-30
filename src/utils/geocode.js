const axios = require("axios");

const getCoordinates = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ2sxMzAwIiwiYSI6ImNrNzFoNGhsMTA1eTkzbXRraGRuMTV6eHEifQ.FuyVuDkS1PqTfcHL5wYEfA&limit=1`;
  axios
    .get(url)
    .then((response) => {
      if (response.data.features.length === 0) {
        cb(undefined, "can not find location. Try another search");
      } else {
        cb(
          {
            latitude: response.data.features[0].center[1],
            longitude: response.data.features[0].center[0],
            location: response.data.features[0].place_name,
          },
          undefined
        );
      }
    })
    .catch((error) => {
      cb(undefined, error.code);
    });
};

module.exports = getCoordinates;
