import { key } from "./key.js";
let weather = {
  apikey: key,
  fetchWeather: function (cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apikey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const temp = Math.round(data.main.temp);
    const { humidity } = data.main;
    const { speed } = data.wind;
    const { pressure } = data.main;
    const feels_like = data.main.feels_like;
    const { all } = data.clouds;

    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".name").innerHTML = name;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".condition").innerHTML = description;
    document.querySelector(".humidity").innerHTML = humidity + "%";
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".wind").innerHTML = speed + "km/h";
    document.querySelector(".pressure").innerHTML = pressure;
    document.querySelector(".feels_like").innerHTML = feels_like + "°C";
    document.querySelector(".clouds").innerHTML = all;

    this.changeImg(description);
  },

  changeImg: function (description) {
    let n = Math.floor(Math.random() * 8) + 1;
    let app = document.querySelector(".weather-app");
    const weatherConditions = [
      { condition: "clouds", prefix: "cloudy" },
      { condition: "clear", prefix: "clear" },
      { condition: "rain", prefix: "rainy" },
      { condition: "snow", prefix: "snowy" },
      { condition: "mist", prefix: "mist" },
      { condition: "drizzle", prefix: "rainy" },
    ];

    for (let i = 0; i < weatherConditions.length; i++) {
      if (description.includes(weatherConditions[i].condition)) {
        const imageUrl = `./WeatherPics/${weatherConditions[i].prefix}${n}.jpg`;
        app.style.backgroundImage = `url(${imageUrl})`;
        break;
      }
    }
  },
  search: function () {
    let searchInput = document.querySelector(".search");
    weather.fetchWeather(searchInput.value);
    searchInput.value = "";
  },
};

function getCities() {
  let cities = document.querySelectorAll(".city").length;
  for (let i = 0; i < cities; i++) {
    document
      .querySelectorAll(".city")
      [i].addEventListener("click", function (e) {
        let cityInput = e.target.innerHTML;
        weather.fetchWeather(cityInput);
      });
  }
}
getCities();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search");
  weather.fetchWeather(searchInput.value);
  searchInput.value = "";
}
document.getElementById("locationInput").addEventListener("submit", search);
