const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecastContainer = document.getElementById("forecast-container");
const loadingMessage = document.getElementById("loading");
const summaryTitle = document.getElementById("summary-title");
const summaryLocation = document.getElementById("summary-location");
const currentlyTemp = document.getElementById("currently-temp");
const currentlyIcon = document.getElementById("currently-icon");
const currentlyPrecip = document.getElementById("currently-precip-percent");
const currentlyHumidity = document.getElementById("currently-humidity");
const currentlyWind = document.getElementById("currently-wind");
const currentlyUV = document.getElementById("currently-uvIndex");
const weeklyForecastTitle = document.getElementById("weekly-forecast-title");
const weeklyForecast = document.getElementById("weekly-forecast");
const alertTitle = document.getElementById("alert-title");
const alertDescription = document.getElementById("alert-description");
// const day = document.getElementById("day");
// const dayIcon = document.getElementById("day-icon");
// const dayHigh = document.getElementById("day-high");
// const dayLow = document.getElementById("day-low");

const hideForecast = () => {
  forecastContainer.classList.add("not-visible");
};

hideForecast();

weatherForm.addEventListener("submit", e => {
  loadingMessage.textContent = "Loading Weather Report...";
  e.preventDefault();
  const location = search.value;

  summaryTitle.textContent = "";
  summaryLocation.textContent = "";
  currentlyTemp.textContent = "";
  currentlyIcon.src = "";
  currentlyPrecip.textContent = "";
  currentlyHumidity.textContent = "";
  currentlyWind.textContent = "";
  currentlyUV.textContent = "";
  weeklyForecastTitle.textContent = "";
  weeklyForecast.textContent = "";
  alertTitle.textContent = "";
  alertDescription.textContent = "";
  // day.textContent = "";
  // dayIcon.textContent = "";
  // dayHigh.textContent = "";
  // dayLow.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      console.log(data);
      if (data.error) {
        forecastContainer.classList.add("not-visible");
        loadingMessage.textContent = data.error;
        summaryTitle.textContent = "";
        summaryLocation.textContent = "";
        currentlyTemp.textContent = "";
        currentlyIcon.src = "";
        currentlyPrecip.textContent = "";
        currentlyHumidity.textContent = "";
        currentlyWind.textContent = "";
        currentlyUV.textContent = "";
        weeklyForecastTitle.textContent = "";
        weeklyForecast.textContent = "";
        alertTitle.textContent = "";
        alertDescription.textContent = "";
        // day.textContent = "";
        // dayIcon.src = "";
        // dayHigh.textContent = "";
        // dayLow.textContent = "";
      } else {
        forecastContainer.classList.remove("not-visible");
        forecastContainer.classList.remove("not-visible");
        loadingMessage.textContent = "";
        summaryTitle.textContent = data.forecast.currently.summary;
        summaryLocation.textContent = data.location;

        // setting icons
        if (data.forecast.currently.icon.includes("clear")) {
          currentlyIcon.src = "../img/SVG/Sun.svg";
        } else if (data.forecast.currently.icon.includes("partly-cloudy")) {
          currentlyIcon.src = "../img/SVG/Cloud-Sun.svg";
        } else if (data.forecast.currently.icon.includes("cloudy")) {
          currentlyIcon.src = "../img/SVG/Cloud.svg";
        } else if (data.forecast.currently.icon.includes("rain")) {
          currentlyIcon.src = "../img/SVG/Umbrella.svg";
        } else if (data.forecast.currently.icon.includes("hail")) {
          currentlyIcon.src = "../img/SVG/Cloud-Hail.svg";
        } else if (data.forecast.currently.icon.includes("snow")) {
          currentlyIcon.src = "../img/SVG/Snowflake.svg";
        } else if (data.forecast.currently.icon.includes("wind")) {
          currentlyIcon.src = "../img/SVG/Cloud-Wind.svg";
        } else if (data.forecast.currently.icon.includes("fog")) {
          currentlyIcon.src = "../img/SVG/Cloud-Fog.svg";
        }

        currentlyTemp.textContent = `${data.forecast.currently.temperature} °F`;
        currentlyPrecip.textContent = `Precipitation Probability: ${Math.round(
          parseFloat(data.forecast.currently.precipProbability * 100)
        )}%`;
        currentlyHumidity.textContent = `Humidity: ${Math.round(
          parseFloat(data.forecast.currently.humidity * 100)
        )}%`;
        currentlyWind.textContent = `Wind Speed: ${
          data.forecast.currently.windSpeed
        } mph`;
        currentlyUV.textContent = `UV Index: ${
          data.forecast.currently.uvIndex
        }`;
        weeklyForecastTitle.textContent = "Forecast";
        weeklyForecast.textContent = data.forecast.daily.summary;

        if (data.forecast.alerts) {
          alertTitle.textContent = `${data.forecast.alerts[0].title}!`;
          alertDescription.textContent = data.forecast.alerts[0].description;
        } else {
          alertDescription.textContent =
            "There are no weather alerts for this location.";
        }

        // day.textContent = `${formattedDate}`;
        // dayIcon.src = "../img/SVG/Cloud-Drizzle-Alt.svg";
        // dayHigh.textContent = `${
        //   data.forecast.daily.data[0].temperatureHigh
        // } °F`;
        // dayLow.textContent = `${data.forecast.daily.data[0].temperatureLow} °F`;
      }
    });
  });
});
