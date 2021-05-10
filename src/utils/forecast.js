const request = require("request");

// const url =
//   "http://api.weatherstack.com/current?access_key=5a97e21a00ce752980749938e4caa64b&query=lagos";

// request({ url: url, json: true }, (error, response) => {
//   const data = response.body.current;

//   if (error) {
//     console.log("unable to connect to weather services");
//   } else if (response.body.error) {
//     console.log("unable to find location");
//   } else {
//     console.log(
//       `${data.weather_descriptions[0]} it is currently ${data.temperature} degrees out,it feels like ${data.feelslike} degrees out`
//     );
//   }
// });

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5a97e21a00ce752980749938e4caa64b&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,

        `${body.current.weather_descriptions[0]} it is currently ${body.current.temperature} degrees out,it feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
