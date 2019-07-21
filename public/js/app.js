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
const day = document.getElementById("day");
const dayIcon = document.getElementById("day-icon");
const dayHigh = document.getElementById("day-high");
const dayLow = document.getElementById("day-low");

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
  currentlyPrecip.textContent = "";
  currentlyHumidity.textContent = "";
  currentlyWind.textContent = "";
  currentlyUV.textContent = "";
  day.textContent = "";
  dayIcon.textContent = "";
  dayHigh.textContent = "";
  dayLow.textContent = "";

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
        day.textContent = "";
        dayIcon.src = "";
        dayHigh.textContent = "";
        dayLow.textContent = "";
      } else {
        forecastContainer.classList.remove("not-visible");
        loadingMessage.textContent = "";
        summaryTitle.textContent = data.forecast.currently.summary;
        summaryLocation.textContent = data.location;

        if (data.forecast.daily.data[0].icon === "clear-day") {
          currentlyIcon.src = "../img/SVG/Sun.svg";
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

        const date = new Date(
          data.forecast.daily.data[0].time * 1000
        ).toString();

        const formattedDate = date.slice(3, 10);

        day.textContent = `${formattedDate}`;
        dayIcon.src = "../img/SVG/Cloud-Drizzle-Alt.svg";
        dayHigh.textContent = `${
          data.forecast.daily.data[0].temperatureHigh
        } °F`;
        dayLow.textContent = `${data.forecast.daily.data[0].temperatureLow} °F`;
      }
    });
  });
});
