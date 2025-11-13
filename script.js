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
    currentTemp: document.getElementById("current-temp"),
    weatherDescription: document.getElementById("weather-description"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("wind-speed"),
    feelsLike: document.getElementById("feels-like"),
    historyList: document.getElementById("history-list")
};

let searckHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

async function getWeatherData(city) {
    showLoading();
    hideError();
    hideWeatherCard();

    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&unit=metric&lang=fr`
        );

        if (!response.ok) {
            throw new Error ("Ville non trouvé");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        showError(error.message);
        return null;
    }
}

function displayWeatherData(data) {
    if (!data) return;

    elements.cityName.textContent = `${data.name},${data.sys.country}`;
    elements.currentDate.textContent = new Date().toLocaleDateString("fr-FR" , {
        weekday: "long",
        year: "numeric",
        month:"long",
        day:"numeric",
    });

    elements.currentTemp.textContent `${Math.round(data.main.temp)}°C`;
    elements.weatherDescription.textContent = data.weather[0].description;

    elements.weatherIcon.src = `https://openweathermap.org/img/wn/
    ${data.weather[0].icon}@2x.png`;
    elements.weatherIcon.alt = data.weather[0].description;

    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${Math.round(data.wind.speed*3.6)}km/h`;
    elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    addToHistory(data.name);

    showWeatherCard();
}