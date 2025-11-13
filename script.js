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

// CORRECTION : searchHistory au lieu de searckHistory
let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

async function getWeatherData(city) {
    showLoading();
    hideError();
    hideWeatherCard();

    try {
        // CORRECTION : units au lieu de unit
        const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
        );

        if (!response.ok) {
            // CORRECTION : pas d'espace + accord
            throw new Error("Ville non trouvée");
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

    elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
    elements.currentDate.textContent = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // CORRECTION : ajout du = manquant
    elements.currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    elements.weatherDescription.textContent = data.weather[0].description;

    // CORRECTION : URL sur une seule ligne
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    elements.weatherIcon.alt = data.weather[0].description;

    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    addToHistory(data.name);
    showWeatherCard();
}

async function handleSearch() {
    // CORRECTION : value au lieu de ariaValueMax
    const city = elements.cityInput.value.trim();

    if (!city) {
        showError("Veuillez entrer une ville");
        return;
    }

    // CORRECTION : weatherData au lieu de weatherdata
    const weatherData = await getWeatherData(city);

    if (weatherData) {
        displayWeatherData(weatherData);
        elements.cityInput.value = "";
    }
}

function addToHistory(city) {
    // CORRECTION : logique de filtre complète
    searchHistory = searchHistory.filter(item => 
        item.toLowerCase() !== city.toLowerCase()
    );
    
    // CORRECTION : searchHistory partout
    searchHistory.unshift(city);
    searchHistory = searchHistory.slice(0, 5);
    localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
    
    displayHistory();
}

function displayHistory() {
    elements.historyList.innerHTML = "";

    // CORRECTION : searchHistory
    searchHistory.forEach(city => {
        // CORRECTION : historyItem au lieu de hitsoryItem
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.textContent = city;

        historyItem.addEventListener("click", () => {
            elements.cityInput.value = city;
            handleSearch();
        });

        elements.historyList.appendChild(historyItem);
    });
}

function showLoading() {
    elements.loading.classList.remove('hidden');
}

function hideLoading() {
    elements.loading.classList.add('hidden');
}

function showWeatherCard() {
    elements.weatherCard.classList.remove('hidden');
    hideLoading();
}

function hideWeatherCard() {
    elements.weatherCard.classList.add('hidden');
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.error.classList.remove('hidden');
    hideLoading();
}

function hideError() {
    elements.error.classList.add('hidden');
}

// Événements
elements.searchBtn.addEventListener('click', handleSearch);

elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayHistory();
});