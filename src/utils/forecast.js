const axios = require("axios");

const getForecast = (lat, long, cb) => {
  const URL = `https://api.darksky.net/forecast/a130565f132217dfd90e8c928c356668/${lat},${long}`;
  axios
    .get(URL)
    .then((response) => {
      if (response.data.currently.temperature === 0) {
        cb(undefined, "Can not find temperature. Try Again");
      } else {
        cb(
          {
            temperature: response.data.currently.temperature,
          },
          undefined
        );
      }
    })
    .catch((error) => {
      cb(undefined, error.code);
    });
};

module.exports = getForecast;
