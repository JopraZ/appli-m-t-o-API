const API_KEY = "d6a7d5fd858c7dde3d0999d0cdccfd03";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const elements = {
    cityInput: document.getElementById("city-input"),
    searchBtn: document.getElementById("search-btn"),
    weatherCard: document.getElementById("weather-card"),
    loading: document.getElementById("loading"),
    error: document.getElementById("error"),
    errorMessage: document.getElementById("error-message"),
    cityName: document.getElementById("city-name"),
    currentDate: document.getElementById("current-date"),
    weatherIcon: document.getElementById("weather-icon"),
    curretnTemp: document.getElementById("current-temp"),
    weatherDescription: document.getElementById("weather-description"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("wind-speed"),
    feelsLike: document.getElementById("feels-like"),
    historyList: document.getElementById("history-list")
};

