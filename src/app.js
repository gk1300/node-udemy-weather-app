const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const pathToPublicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(pathToPublicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gaurav",
  });
});

app.get("/jyoti", (req, res) => {
  res.render("jyoti", {
    title: "I love you",
    name: "Gaurav",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Gaurav",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "Guarav",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is compulsory",
    });
  }
  geocode(req.query.address, (geocodeData, error) => {
    if (error) {
      return res.send({ error });
    }
    forecast(
      geocodeData.latitude,
      geocodeData.longitude,
      (forecastData, error) => {
        if (error) {
          res.send({ error });
        }
        res.send({
          forecast: forecastData.temperature,
          location: geocodeData.location,
          address: req.query.address,
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help page is not found");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Lost",
    name: "Gaurav",
  });
});

app.listen(port, () => {
  console.log(`App server has started at ${port}`);
});
