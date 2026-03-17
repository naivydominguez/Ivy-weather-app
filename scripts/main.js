import { getWeather } from './weatherService.js';
import { displayWeather } from './uiRenderer.js';

let currentWeather = null;
let isCelsius = true;
let searchHistory = [];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const unitToggleBtn = document.getElementById('unit-toggle');
    const historyContainer = document.getElementById('search-history');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (!city) return;

        fetchAndDisplay(city);
    });

    unitToggleBtn.addEventListener('click', () => {
        isCelsius = !isCelsius;
        if(currentWeather){
            displayWeather(currentWeather,isCelsius);
        }
    });

    function renderHistory() {
        historyContainer.innerHTML = '';
        searchHistory.forEach(city => {
            const btn = document.createElement('button');
            btn.textContent = city;
            btn.addEventListener('click', () => fetchAndDisplay(city));
            historyContainer.appendChild(btn);
        });
    }

     function fetchAndDisplay(city) {
        getWeather(city)
            .then(data => {
                currentWeather = data;
                displayWeather(data, isCelsius);

                if (!searchHistory.includes(city)) {
                    searchHistory.unshift(city); 
                    if (searchHistory.length > 5) searchHistory.pop();
                    renderHistory();
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayWeather({ main: { temp: 'N/A' }, weather: [{ description: 'Unable to fetch data' }] }, isCelsius);
            });
    }
});

