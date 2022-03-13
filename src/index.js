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

function displaydate(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", " Fri", "Sat"];
  return days[day];
}
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

function getDailyForcast(coordinates) {
  let units = "metric";
  let apiKey = "2d0271702a5c12ccb610ae9f48878fd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(DisplayDailyforcast);
}

function searchHandler(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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

  getDailyForcast(response.data.coord);
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
  let latitude = position.coords.lat;
  let longitude = position.coords.lon;
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

//#region weather forecast
function DisplayDailyforcast(response) {
  let Displayforcast = response.data.daily;
  let DaysForcast = document.querySelector("#weatherforcast-days");
  let Forcasthtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;

  Displayforcast.forEach(function (forcastDay, index) {
    if (index >= 4) {
      Forcasthtml =
        Forcasthtml +
        `
      <div
            class="card card border-0 Forcast-Card-Style Forcast-Card-Style px-0 "
            style="width: 25rem"
           
          >
       <div class="card-body nextDaysWeather ">
                  <p class="weekday">${displaydate(forcastDay.dt)}</p>
                  <div class="col" id="daysicon">
                    <img
                      src="http://openweathermap.org/img/wn/${
                        forcastDay.weather[0].icon
                      }@2x.png"
                       width="90"
                    />
                  </div>

                  <class class="row temperatureMinMax">
                    <class class="col-6">
                      <i class="bi bi-caret-up-fill" id="max-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-up-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                          />
                        </svg>
                      </i>

                      <div id="highestTemperature">${Math.round(
                        forcastDay.temp.max
                      )}°</div>
                    </class>

                    <class class="col-6">
                      <i class="bi bi-caret-down-fill" id="min-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-down-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                          />
                        </svg>
                      </i>

                      <div id="lowestTemperature">${Math.round(
                        forcastDay.temp.min
                      )}°</div>
                    </class>
                  </class>
                </div>
                </div>
     `;
    }
  });
  Forcasthtml = Forcasthtml + `</div>`;
  DaysForcast.innerHTML = Forcasthtml;
}
//#endregion
