import { $, showMessage } from './utils.js';
import { OMDB_API_KEY } from './config.js';

const form = $('#search-form');
const input = $('#movie-input');
const message = $('#message');
const moviesBox = $('#movies');

const BASE_URL = 'https://www.omdbapi.com/';
const NO_POSTER = 'https://via.placeholder.com/300x450?text=No+Poster';

// Get full details (rating, release date...) for one movie - uses Promises (.then)
const getDetails = (id) =>
  fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`).then((res) => res.json());

// Search movies by title - uses async/await
const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Network error. Please try again.');
  const data = await res.json();

  if (data.Response === 'False') {
    throw new Error(data.Error === 'Movie not found!'
      ? `No movies found for "${query}".`
      : data.Error);
  }
  // Fetch details of every result at the same time
  return Promise.all(data.Search.map(({ imdbID }) => getDetails(imdbID)));
};

const renderMovies = (movies) => {
  moviesBox.innerHTML = movies.map(({ Title, Year, Poster, imdbRating, Released, Genre }) => `
    <div class="movie">
      <img src="${Poster !== 'N/A' ? Poster : NO_POSTER}" alt="${Title} poster">
      <div class="info">
        <h3>${Title} (${Year})</h3>
        <p>⭐ ${imdbRating}</p>
        <p>📅 ${Released}</p>
        <p>🎭 ${Genre}</p>
      </div>
    </div>`).join('');
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return showMessage(message, 'Please type a movie name.', true);

  if (OMDB_API_KEY === 'YOUR_API_KEY_HERE') {
    return showMessage(message, 'Add your OMDb API key in js/config.js first.', true);
  }

  moviesBox.innerHTML = '';
  showMessage(message, 'Searching...');

  try {
    const movies = await searchMovies(query);
    renderMovies(movies);
    showMessage(message, `Found ${movies.length} result(s).`);
  } catch (error) {
    showMessage(message, error.message, true);
  }
});
