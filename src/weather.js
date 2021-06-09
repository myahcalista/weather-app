// Week 4 – feature 1
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let dateIndex = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[date.getMonth()];
  return `${hours}:${minutes}, ${day} ${dateIndex}/${month}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 location-container">
      <div class="forecast-day">
        <strong>${formatDay(forecastDay.dt)}</strong>
      </div>

      <div class="weather-forecast-temperatures">
        <span class="forecast-max"> ${Math.round(forecastDay.temp.max)}° </span>
        <span class="forecast-min"> ${Math.round(forecastDay.temp.min)}° </span>
      </div>

   
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
       
      
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `0fc877c9db70ed6c0b106374b2c67e9c`;

  let apiUrl = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showCurrentLocationTempreture(response) {
  let celcius = response.data.main.temp;
  document.querySelector(`#current-location`).innerHTML = response.data.name;
  document.querySelector(`#current-temp`).innerHTML = Math.round(celcius);

  document.querySelector(`#current-condition`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#pressure`).innerHTML = response.data.main.pressure;

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind-speed`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#current-condition`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#current-date`).innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector(`#icon`);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

//week 4 feature 2, & week 5 feature 1

function searchCity(city) {
  let apiKey = `0fc877c9db70ed6c0b106374b2c67e9c`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentLocationTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;

  searchCity(city);
}

let currentLocation = document.querySelector(".search-bar");
currentLocation.addEventListener("submit", handleSubmit);

//week 4 bonus feature

function searchLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `0fc877c9db70ed6c0b106374b2c67e9c`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentLocationTempreture);
}

function findCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener("click", findCurrentLocation);

searchCity("Pissouri");

displayForecast();
