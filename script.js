const movies = [
  { name: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama" },
  { name: "The Godfather", year: 1972, rating: 9.2, genre: "Crime" },
  { name: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action" },
  { name: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime" },
  { name: "Forrest Gump", year: 1994, rating: 8.8, genre: "Drama" },
  { name: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { name: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi" },
  { name: "Spirited Away", year: 2001, rating: 8.6, genre: "Animation" },
  { name: "Parasite", year: 2019, rating: 8.5, genre: "Thriller" },
  { name: "Gladiator", year: 2000, rating: 8.5, genre: "Action" }
];


function capitalize(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

function createCard(movieList) {
    const container = document.getElementById("movie-container");

    container.innerHTML = "";

    movieList.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
        <h2>${movie.name}</h2>
        <p>Year: ${movie.year}</p>
        <p>Rating: ${movie.rating}</p>
        <p>Genre: ${movie.genre}</p>
        <button class="remove-btn"> Remove </button>
        `;

        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", removeCard);

        container.appendChild(card);
    });
}

function removeCard(event) {
    event.target.parentElement.remove();
}

function addMovie(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const newMovie = Object.fromEntries(formData);

    newMovie.name = capitalize(newMovie.name);
    newMovie.genre = capitalize(newMovie.genre);
    newMovie.year = Number(newMovie.year);
    newMovie.rating = Number(newMovie.rating);

    movies.push(newMovie);
    createCard(movies);
    rendergenreOptions();
    form.reset();
}




const form = document.getElementById("add-movie-form");

form.addEventListener("submit", addMovie);

const genreFilter = document.getElementById("genre-filter");
genreFilter.addEventListener("change", filterMovies);

function rendergenreOptions() {
    const genres = [];

    for (const movie of movies) {
        if (!genres.includes(movie.genre)) {
            genres.push(movie.genre);
        }
    }

    genres.sort();

    genreFilter.innerHTML = `<option value="all">All genres</option>`;

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });


}

function filterMovies() {
    const selectedGenre = genreFilter.value;

    if (selectedGenre === "all") {
        createCard(movies);
        return;
    }

    const filteredMovies = movies.filter(movie => {
        return movie.genre === selectedGenre;
    });

    createCard(filteredMovies);
}
createCard(movies);
rendergenreOptions();
