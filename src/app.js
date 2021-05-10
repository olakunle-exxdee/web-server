const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils//forecast");

const app = express();

// define path for express config
const viewsPath = path.join(__dirname, "../template/views");
const publicDirPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../template/partials");

// set handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    message: "home !!!!!!!!!!!!!!!!!!!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    message: "about !!!!!!!!!!!!!!!!!!!",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP!!",
    message: "help me !!!!!!!!!!!!!!!!!!!",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter an Address",
    });
  }
  geocode(req.query.address, (error, { logitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(logitude, latitude, (error, dataForecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        logitude,
        latitude,
        location,
        forecast: dataForecast,
      });
    });
  });
  // console.log(req.query.address);
});
app.get("/products", (req, res) => {
  console.log(req.query);

  if (!req.query.search) {
    return res.send({
      error: "Enter a SEARCH string!!!!!!!!",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "error",
    errorMessage: "no help article  found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "error",
    errorMessage: "no page found",
  });
});
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
