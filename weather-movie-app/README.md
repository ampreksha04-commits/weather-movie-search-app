# Weather App + Movie Search App

Minor Project 03 – built with HTML5, CSS3 and JavaScript (ES6+).

## Features
**Weather App**
- Search weather by city name
- Shows temperature, weather condition, humidity and wind speed
- Handles errors (city not found, network problems)

**Movie Search App**
- Search movies with the OMDb API
- Shows poster, rating, release date and genre
- Handles invalid searches and missing posters

Both apps are responsive (work on mobile and desktop).

## Concepts Used
- Arrow functions, template literals, destructuring, ES modules
- Promises, async/await, Fetch API, try/catch error handling
- DOM manipulation, event handling, form processing

## APIs
- Weather: [Open-Meteo](https://open-meteo.com/) (no key needed)
- Movies: [OMDb API](https://www.omdbapi.com/) (free key needed)

## How to Run
1. Get a free key from https://www.omdbapi.com/apikey.aspx
2. Paste it in `js/config.js`
3. Open the folder in VS Code and run with **Live Server**
   (ES modules do not work by double-clicking the HTML file).

## Folder Structure
```
index.html
weather.html
movie.html
css/style.css
js/utils.js
js/weather.js
js/movie.js
js/config.js
```
