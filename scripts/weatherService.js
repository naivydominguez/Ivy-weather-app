const API_KEY = 'd8673ae537ecc5cc2fe61f794bfe3ef6';

export function getWeather(city) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => data);
}
