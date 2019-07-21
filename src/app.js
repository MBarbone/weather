require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
app.set("view engine", "hbs");
const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);

// Serve Static Directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mike"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mike"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Mike Barbone"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address." });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("help404", {
    title: "404",
    name: "Mike",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("general404", {
    title: "404",
    name: "Mike",
    errorMessage: "Page not found."
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
