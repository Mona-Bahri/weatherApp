//#region date
function DateTime(Date) {
  let hour = Date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = Date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let day = Date.getDay();
  let days = [
    "Sunday",
    "Monday",
    " Tuesday",
    " Wednesday",
    " Thursday",
    " Friday",
    "Saturday",
  ];
  let dayIndex = days[day];
  return `${dayIndex} ${hour}:${minute}`;
}
let timeZone = document.querySelector("#timeZone");
let now = new Date();
timeZone.innerHTML = DateTime(now);

//#endregion

//#region temperature
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsius.classList.add("activeBtn");
  fahrenheit.classList.remove("activeBtn");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.add("activeBtn");
  celsius.classList.remove("activeBtn");
  let temperature = document.querySelector("#temperature");
  let fahrenheitElement = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitElement);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitToCelsius);
//#endregion

//#region search for city temp
function handelDefultCity(city) {
  let units = "metric";
  let apiKey = "2d0271702a5c12ccb610ae9f48878fd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(searchHandler);
}

function searchHandler(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#waether-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;
  handelDefultCity(city);
}

let searchCurrentCity = document.querySelector("#searchForm");
searchCurrentCity.addEventListener("submit", searchCity);
handelDefultCity("New York");
let celsiusTemperature = null;

//#region  current Loaction

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "2d0271702a5c12ccb610ae9f48878fd2";
  let appUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(appUrl).then(searchHandler);
}

function showcurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationBtn = document.querySelector("#current-loctionbtn");
currentLocationBtn.addEventListener("click", showcurrentWeather);

//#endregion

//#endregion
