import { $, showMessage } from './utils.js';

// Uses the free Open-Meteo API (no API key needed)
const form = $('#search-form');
const input = $('#city-input');
const message = $('#message');
const result = $('#result');

const weatherCodes = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow',
  75: 'Heavy snow', 80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with hail'
};

// Step 1: city name -> latitude/longitude
const getLocation = async (city) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  if (!res.ok) throw new Error('Could not reach the location service.');
  const data = await res.json();
  if (!data.results) throw new Error(`City "${city}" not found. Check the spelling.`);
  return data.results[0];
};

// Step 2: latitude/longitude -> current weather
const getWeather = async (latitude, longitude) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Could not fetch weather data.');
  const data = await res.json();
  return data.current;
};

// Step 3: show it on the page
const renderWeather = (place, current) => {
  const { temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code } = current;
  const condition = weatherCodes[weather_code] || 'Unknown';

  result.innerHTML = `
    <div class="card">
      <h2>${place.name}, ${place.country}</h2>
      <p class="temp">${temperature_2m}°C</p>
      <p>${condition}</p>
      <div class="details">
        <span>💧 Humidity: ${relative_humidity_2m}%</span>
        <span>💨 Wind: ${wind_speed_10m} km/h</span>
      </div>
    </div>`;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return showMessage(message, 'Please enter a city name.', true);

  result.innerHTML = '';
  showMessage(message, 'Loading...');

  try {
    const place = await getLocation(city);
    const current = await getWeather(place.latitude, place.longitude);
    renderWeather(place, current);
    showMessage(message, '');
  } catch (error) {
    showMessage(message, error.message, true);
  }
});
