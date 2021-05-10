const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoib2xha3VubGUtZXh4ZGVlIiwiYSI6ImNrb2M5dGtzajBvZHgycW9kODA0czZwOWUifQ.s1makhEltmchcOk0apl5Fg&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    const { features } = body;

    if (error) {
      callback("unable to connect to mapbox services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        logitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
